import {Helmet} from 'react-helmet'

const Meta=({title, description, keywords})=>(
	<Helmet>
		<title>{title}</title>
		<meta name='description' content={description} />
		<meta name='keywords' content={keywords} />
	</Helmet>
)
Meta.defaultProps={
	title:'Welcome to ProShop',
	description:'We sell the best products for cheap price',
	keywords:'electronics, buy electronics, checp electronics'
}
export default Meta