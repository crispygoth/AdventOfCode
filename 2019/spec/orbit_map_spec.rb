require 'orbit_map'

describe OrbitMap do
	input1 = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L']
	om1 = OrbitMap.new(input1)

	describe "given #{input1.to_s}" do
		{ 'D' => 3, 'L' => 7, 'COM' => 0 }.each do |obj, orbits|
			it "#{obj} has #{orbits} orbits" do
				expect(om1.count_orbits(obj)).to eq(orbits)
			end
		end

		it "has 42 total orbits" do
			expect(om1.total_orbits).to eq(42)
		end
	end

	input2 = [ 'COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN' ]
	om2 = OrbitMap.new(input2)
	describe "given #{input2.to_s}" do
		it "finds the correct path" do
			expect(om2.find_path).to eq(['K','J','E','D','I'])
		end
	end

end
