import React from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Papersheet from '../../../components/utility/papersheet';
import { FullColumn } from '../../../components/utility/rowColumn';


export default () => (
	<LayoutWrapper>
		<FullColumn>
			<Papersheet title="List of Products">
				Implement list of products here
			</Papersheet>
		</FullColumn>
	</LayoutWrapper>
);