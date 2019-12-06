class Node
	attr_reader :name, :children
	attr_accessor :parent
	protected 'parent='

	def initialize(name)
		@name = name
		@children = []
		@parent = nil
	end

	def <<(child)
		@children << child
		child.parent = self
	end
end

class Tree < Hash
	def initialize(root_name)
		self << root_name
		@root_name = root_name
	end

	def <<(nodename)
		self[nodename] = Node.new(nodename)
	end

	def add_node(parent, child)
		raise UnknownParentError, parent unless self.include? parent

		self << child unless self.include? child

		self[parent] << self[child]
	end

	def depth_first(start = nil)
		start = self[@root_name] if start.nil?
		node_stack = [start]
		visited = [start.name]

		loop do
			curr_node = node_stack.pop
			return if curr_node.nil?

			yield curr_node

			node_stack += curr_node.children
		end
	end

	def depth_first_search(find_name, start = nil)
		self.depth_first(start) do |node|
			return true if node.name == find_name
		end

		false
	end
end

class UnknownParentError < RuntimeError
end

class OrbitMap
	def initialize(input, root_node = 'COM')
		@orbits = Tree.new(root_node)
		loop do
			next_input = []

			input.each do |edge|
				begin
					@orbits.add_node(*edge.split(')'))
				rescue UnknownParentError => e
					next_input << edge
				end
			end

			break if next_input.empty?

			if input.length == next_input.length then
				raise "unable to find parents for #{next_input.to_s}"
			end

			input = next_input
		end
	end

	def count_orbits(node_name)
		i = 0
		curr_node = @orbits[node_name]

		loop do
			curr_node = curr_node.parent
			break if curr_node.nil?
			i += 1
		end

		i
	end

	def total_orbits
		@orbits.keys.collect { |node| count_orbits(node) }.reduce(0, &:+)
	end

	def find_path(from = 'YOU', to = 'SAN')
		# find path from the start to the common ancestor
		from_soi = @orbits[from].parent
		from_path = []

		loop do
			from_path << from_soi.name

			break if @orbits.depth_first_search(to,from_soi)

			from_soi = from_soi.parent
		end

		# now find the path from the final destination to the common ancestor
		to_soi = @orbits[to].parent
		to_path = []

		loop do
			break if to_soi.name == from_soi.name

			to_path << to_soi.name

			to_soi = to_soi.parent
		end

		from_path + to_path.reverse
	end			
end
