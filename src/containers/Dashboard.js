import React,{ useState }  from 'react';
import LayoutWrapper from '../components/utility/layoutWrapper';
import Papersheet from '../components/utility/papersheet';
import { FullColumn } from '../components/utility/rowColumn';
import IntlMessages from '../components/utility/intlMessages';
import image from '../images/honey.jpg';

//product-create
//import ProductCreate from './Page/createProduct/create-product'
// import Counter from './Page/createProduct/create-product'
// import { FormsComponentWrapper, FormsMainWrapper } from './Page/createProduct/product.style';

let hit={
	'price':100,
	'rating' : 2,
	'image':image
};


let images={}

const setImages = (event)=>{
	console.log(event.target.value);
}

export default () => (
	

	<LayoutWrapper>
		<FullColumn>
			<Papersheet title={<IntlMessages id="sidebar.dashboard" />}>
				Mate Dashboard
			</Papersheet>
			{/* <div className="algoliaMainWrapper">
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			<Hit hit={hit}/>
			</div> */}

		</FullColumn>
		{/* <RecipeReviewCard title={"hahh"} img={image} date={"2010/12/12"} message={"hasdfhdshfhsdfhshdfsjdhfbhsbcvdjsbhvffhjdsfbvhfvbhjbfvhjdfbvhjbdfvhjbfvjhbdfvhjdfvbhdfbh	"}/> */}
		
		
		
		{/* <FormsMainWrapper>
          	<FormsComponentWrapper className="mateFormsComponent">
				<FullColumn>
					<Counter />
					<MyInnerForm setSelect={setSelect}/>
				</FullColumn>
			</FormsComponentWrapper>
        </FormsMainWrapper> */}
		{/* <ProductCreate /> */}
	</LayoutWrapper>
);
