require 'hull_painter'

describe HullPainter do
	describe 'with the example output' do
		output = [1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0 ].inject(Queue.new, :push)
		output.close

		hp = HullPainter.new(0)
		hp.paint(Queue.new, output)

		it 'paints 6 panels' do
			expect(hp.num_panels_painted).to eq(6)
		end
	end
end
