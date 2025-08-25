import { selectedPage } from "./navigationTypes";
import { Link, useNavigate } from "react-router-dom";
import {useState, type ChangeEvent} from "react"
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid"
import useMediaQuery from "../../hooks/useMediaQuery";
import {UsersIcon} from "@heroicons/react/24/solid"
// import useAuthStatusChange from "../../hooks/useAuthStatusChange";
// import UseScroll from "../../hooks/useScroll";
 type props = {
    setSelectedPage : (value: selectedPage) => void,
    pageState : selectedPage,
    scroll ? : boolean
 }
const Navigation = ({setSelectedPage, pageState, scroll} : props) => {
    //    const {scroll} = UseScroll()
    // const {checkingStatus, authStatus} = useAuthStatusChange()
    const isMediaAbove = useMediaQuery("(min-width : 1060px)")
    const [menuToggled, setMenuToggled] = useState<boolean>(false)
    const navigate = useNavigate()
    const isTopOfPage = scroll ? "bg-transparent drop-shadow backdrop-blur-sm" : null
    const flexConts = "flex items-center justify-between"
    
    const handleNavigate = () : void => {
        navigate("/contribute-data") 
    }
   
    
     return ( 
        <nav >
            <div className={`w-full py-6 z-[200] fixed top-0   left-0   `}>
                <div className={`mx-auto w-[85%]   ${isTopOfPage}`}>
                    
                    <div className={`${flexConts} w-full gap-20`}>
                            
                            <Link
                                   to={'/'}
                                >
                                    <h2 className="font-bold text-2xl text-dark-green-20">clear</h2>
                                </Link>

                        {/* right side */}
                        {
                            isMediaAbove ? (
                                <div className={`${flexConts} w-full `}>
                            <div className={`flex items-center justify-between gap-10 text-sm capitalize text-black`}>
                               
                                <Link
                                    to={`/about`}
                                >
                                    view
                                </Link>
                             
                                <Link 
                                    to={`/contact`}
                               
                                >
                                    contributeData
                                </Link>
                            </div>
                            <div className={`${flexConts} gap-10 capitalize text-[16px]`}>
                               
                                <button onClick={handleNavigate} className={`cursor-pointer bg-[#0A8080] hover:bg-[#2c6a8f]  rounded-md capitalize text-white py-2 px-10`}>
                                  signUp
                                </button>
                                 
                                   <LanguageSwitcher />
                            </div>
                        </div>
                            ) : 
                                <button className={`rounded-full bg-[#0A8080] p-2 transition duration-300 `}
                                    onClick={() => setMenuToggled(!menuToggled)}
                                >
                                    { !menuToggled ? <Bars3Icon  className="h-6 w-6 text-white"></Bars3Icon>: <XMarkIcon className="h-6 w-6 text-white"></XMarkIcon>}
                                
                                </button>
                            
                        }
                    </div>
                </div>
            </div>
            {
                !isMediaAbove && menuToggled && (
                    <div className="fixed z-40  w-[300px] bottom-0  h-full bg-dark-green-20 drop-shadow-xl right-0 text-black">
                        <div className="flex justify-end p-12 text-2xl">
                            <button onClick={() => setMenuToggled(!menuToggled)}>
                                <XMarkIcon  className="h-6 w-6 text-white"/>
                            </button>
                        </div>
                        <div className={`flex ml-[33%] flex-col gap-10 text-xl capitalize`}>
                            
                                <Link
                                    to={'/contribute-data'}
                                >
                                    contributeData
                                </Link>
                                    
                                <Link
                                    to={'/view'}
                                >
                                    view
                                </Link>

                                <Link
                                    to={'/view'}
                                >
                                    signUp
                                </Link>
                                
                            </div>
                    
                    </div>
                ) 
            }
        </nav>
     );
}
 
export default Navigation;