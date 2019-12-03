require "crossed_wires"

describe CrossedWires do
	[
		{:input => ["R8,U5,L5,D3","U7,R6,D4,L4"], :manhatten => 6, :path => 30 },
		{:input => ["R75,D30,R83,U83,L12,D49,R71,U7,L72","U62,R66,U55,R34,D71,R55,D58,R83"], :manhatten => 159, :path => 610 },
		{:input => ["R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51","U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"], :manhatten => 135, :path => 410 },
	].each do |test|
		describe "given #{test[:input]}" do
			it "returns a shortest_manhatten_distance of #{test[:manhatten]}" do
				expect(CrossedWires.new(test[:input]).shortest_manhatten_distance).to eq(test[:manhatten])
			end

			it "returns a shortest_path of #{test[:path]}" do
				expect(CrossedWires.new(test[:input]).shortest_path).to eq(test[:path])
			end
		end
	end
end
