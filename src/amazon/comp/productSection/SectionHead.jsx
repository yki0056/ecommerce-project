import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux'
import './SectionHead.css'
import {Link, useLocation} from 'react-router-dom';


const SectionHead = ({singlePageHideFilter})=>{  // 
    const dispatch = useDispatch();
    const location = useLocation(); 
    let locate = location.pathname;  //  /electronic/smartphones/iPhone%209
    let aa = locate.split("/");     //  ['', 'electronic', 'smartphones', 'iPhone%209']
    let address = aa.slice(1);      //  ['electronic', 'smartphones', 'iPhone%209']
    
    const [intersectPassed, setIntersectPassed] = useState(null);
    const [filterMenuShow, setFilterMenuShow] = useState(false); 
    const sHeader = useRef(null)

    const clickShowFilter = ()=>{
        let filterStatus = !filterMenuShow
        dispatch({type:"FILT_STATUS", payload:filterStatus})
        setFilterMenuShow(filterStatus)
    }

    const selectedSort = (e) => {
        const sortType = e.target.value.toUpperCase()
        dispatch({type: sortType})
    }

    const yScrollEvent = () => {
        let headerTopPosition = document.body.getBoundingClientRect().top
        if(headerTopPosition < -170){
            setIntersectPassed(true);
        } else {
            setIntersectPassed(false);
        }
    };

    //console.log(intersectPassed)

    window.addEventListener('scroll', yScrollEvent);

    return (
            <div className={intersectPassed ? 'sHeader  fix-position' : 'sHeader'} ref={sHeader}>
                <div className= {intersectPassed ? 'sHeader_path smallerText' : 'sHeader_path' }>
                    <Link to={'/'}>Home</Link>
                    {address[0] ? <span> <i className="fa-solid fa-slash"></i> </span> : ''}
                    <Link to={`/${address[0]}`}>{address[0]}</Link>
                    {address[1] ? <span> <i className="fa-solid fa-slash"></i> </span> : ''}
                    <Link to={`/${address[0]}/${address[1]}`}>{address[1]}</Link>
                    {address[2] ? <span> <i className="fa-solid fa-slash"></i> </span> : ''}
                    <span>{address[2]}</span>
                </div>

                {singlePageHideFilter ? '' : 
                    <div className={intersectPassed ? 'sArrange smallerText' : 'sArrange'}>
                        <div onClick={clickShowFilter} className="sfilter_button">
                            {filterMenuShow ? 
                                <div className='showFilt'><p>Show Filters</p><i className="fa-solid fa-eye"></i></div> 
                                : 
                                <div className='showFilt'><p>Hide Filters</p><i className="fa-solid fa-eye-slash"></i></div> 
                            }
                        </div> 
                        <div className="sSort">
                            <span>Sort By: </span>
                            <select onChange={selectedSort}>
                                <option value="Featured">Featured</option>
                                <option value="Rating">Rating</option>
                                <option value="Price: High-Low">Price: High-Low</option>
                                <option value="Price: Low-High">Price: Low-High</option>
                            </select>
                        </div>
                    </div>
                }
            </div>
    )
}

export default SectionHead;