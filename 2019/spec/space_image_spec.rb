require 'space_image'

describe SpaceImage do
	describe 'when given the first example image' do
		it 'parses the correct layers' do
			si = SpaceImage.new(3,2)
			si.read('123456789012')
			expect(si.layers).to eq([
				[
					[1,2,3],
					[4,5,6]
				],
				[
					[7,8,9],
					[0,1,2]
				]
			])
		end
	end
	describe 'when given the second example image' do
		it 'flattens correctly' do
			si = SpaceImage.new(2,2)
			si.read('0222112222120000')

			expect(si.layers).to eq([
				[[0,2],[2,2]],
				[[1,1],[2,2]],
				[[2,2],[1,2]],
				[[0,0],[0,0]]
			])
			expect(si.flatten).to eq([[0,1],[1,0]])
		end
	end
end
