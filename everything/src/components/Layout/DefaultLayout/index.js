import Header from '~/components/Layout/components/Header'
 import SideBar from './Sidebar'

 const DefaultLayout = ({ children }) =>{
    return (
        <div>
            <Header/>
            <div className="container">
                <SideBar/>
                <div class="container">
                    {children}
                </div>
            </div>
        </div>
    )
 }

 export default DefaultLayout