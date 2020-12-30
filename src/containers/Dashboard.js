import React from 'react';
import LayoutWrapper from '../components/utility/layoutWrapper';
import Papersheet from '../components/utility/papersheet';
import { FullColumn } from '../components/utility/rowColumn';
import IntlMessages from '../components/utility/intlMessages';
import image from '../images/honey.jpg';
import Hit from '../containers/Page/products/products'
let hit={
	'price':100,
	'rating' : 2,
	'image':image
};
export default () => (
	<LayoutWrapper>
		<FullColumn>
			<Papersheet title={<IntlMessages id="sidebar.dashboard" />}>
				Mate Dashboard
			</Papersheet>
			<div className="algoliaMainWrapper">
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			</div>
		</FullColumn>
		{/* <RecipeReviewCard title={"hahh"} img={image} date={"2010/12/12"} message={"hasdfhdshfhsdfhshdfsjdhfbhsbcvdjsbhvffhjdsfbvhfvbhjbfvhjdfbvhjbdfvhjbfvjhbdfvhjdfvbhdfbh	"}/> */}

	</LayoutWrapper>
);
