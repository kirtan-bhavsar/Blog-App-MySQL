import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../api/Context/authContext.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import {FaHeart} from 'react-icons/fa';
import {FaRegHeart} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {


  const location = useLocation();
  const navigate = useNavigate();

  const queries = useLocation().search;
  console.log(queries);
  console.log("queries");
  console.log("queries");

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  const cat = query.get('cat');
  // const sort = query.get('sort');
  // const paginationCurrentPage = Number(query.get('page'))  || 1;

  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState();
  const [currentPage, setCurrentPage] = useState();
  // const [sort,setSort] = useState();


  const { currentUser } = useContext(AuthContext);


  const arrayIndex = Math.ceil(totalPosts / 5);
  // console.log(arrayIndex);
  // console.log("arrayIndex");
  // console.log("arrayIndex");

  const paginationArray = Array.from({ length: arrayIndex }, (_, index) => index + 1);
  // console.log(paginationArray);
  // console.log("paginationArray");
  // console.log("paginationArray");


  //  const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];


  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  const [sortType,setSortType] = useState('newest');

  const handleSortChange = (e) => {

    const selectedSortType = e.target.value;

    setSortType(selectedSortType);

    // const sort = query.get('sort');
    console.log("handleSortChange called");
    console.log("handleSortChange called");

    console.log(e.target.value);
    // const sortType = e.target.value;
    console.log("e.target.value");
    console.log("e.target.value");

    navigate(`/?cat=${cat}&page=${currentPage}&sort=${selectedSortType}`);

  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`api/v1/posts${queries}`);
        //  console.log(`api/v1/posts${location.search}`);
        //  console.log(data.data[0]);
        // console.log("data.data[0] in Home.jsx");
        // console.log('data.data[0] in Home.jsx');
        // console.log(data.data[1][0].totalPosts);
        // console.log("data.data[1] in Home.jsx");
        // console.log('data.data[1] in Home.jsx');
        setPosts(data.data.data[0]);
        setTotalPosts(data.data.data[1][0].totalPosts);
        setCurrentPage(data.data.currentPage);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [queries,sortType]);



  return (
    <div className='home'>
      <div className="sort">
        <select name="sort" id="sort" className='sort-selection' onChange={handleSortChange}>
          {/* <option className='sort-option' value="newest"><Link className='link order-link-display' to={`/?page=${currentPage}&sort=newest`}>Newest</Link></option> */}
          {/* <option className='sort-option' value="newest"><Link className='link order-link-display' to={`/?page=${currentPage}&sort=oldest`}>Oldest</Link></option> */}
          {/* <option className='sort-option' value="newest"><Link className='link order-link-display' to={`/?page=${currentPage}&sort=most-liked`}>Most Liked</Link></option> */}
          {/* <option className='sort-option' value="newest"><Link className='link order-link-display' to={`/?page=${currentPage}&sort=least-liked`}>Least Liked</Link></option> */}
          <option className='sort-option' value="newest" >Newest</option>
          <option className='sort-option' value="oldest" >Oldest</option>
          <option className='sort-option' value="most-liked" >Most Liked</option>
          <option className='sort-option' value="least-liked" >Least Liked</option>
        </select>
      </div>
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post">
              <div className="img">
                <img src={`../../public/upload/${post.img}`} alt="img" />
              </div>
              <div className="content">
                <Link className='link' to={`/post/${post.id}`}><h1>{post.title}</h1></Link>
                {/* <p>{getText(post.description)}</p> */}
                <p>{getText(post.description).length > 200 ? getText(post.description).slice(0,200) + "..." : getText(post.description) }</p>
                             <div className="like">
               <FaRegHeart className='like-button'></FaRegHeart>
               <p className="like-count">{post.likesCount}</p>
             </div>
                <button><Link className='link' to={`/post/${post.id}`}>Read More</Link></button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="pagination">
        <div className="paginationContainer">
          {Number(currentPage) !== 1 && <Link to={cat ? `/?cat=${cat}&page=${Number(currentPage) - 1}` : `/?page=${Number(currentPage) - 1}`}><FaChevronLeft className='paginationBtn'></FaChevronLeft></Link>}

          {/* {paginationArray.map((pageNum) => {
       return(
           <div className="paginationBtn">
             <Link to={cat ? `/?cat=${cat}&page=${pageNum}` : `/?page=${pageNum}`}><button className={pageNum === Number(currentPage) ? 'active' : ''}>{pageNum}</button></Link>
           </div>
       )
      })} */}


          {/* Dynamic Pagination with skip values starts */}

          {/* Button to display 1 always */}
          <div className="paginationBtn">
            <Link to={cat ? `/?cat=${cat}&page=1&sort=${sortType}` : `/?page=1&sort=${sortType}`}><button className={Number(currentPage) === 1 ? 'active' : ''}>1</button></Link>
          </div>

          {/* Dots for the previous */}
          {currentPage > 3 && <div className="paginationBtn">
            <Link><button>...</button></Link>
          </div>}

          {/* Page before current page */}
          {Number(currentPage) !== 1 && Number(currentPage) !== 2 &&
            <div className="paginationBtn">
              <Link to={cat ? `/?cat=${cat}&page=${Number(currentPage - 1)}&sort=${sortType}` : `/?page=${Number(currentPage - 1)}&sort=${sortType}`}><button>{Number(currentPage) - 1}</button></Link>
            </div>
          }

          {/* Current page to display */}
          {Number(currentPage) !== 1 && Number(currentPage) !== Number(arrayIndex) &&
            <div className="paginationBtn">
              <Link to={cat ? `/?cat=${cat}&page=${Number(currentPage)}&sort=${sortType}` : `/?page=${Number(currentPage)}&sort=${sortType}`}><button className='active'>{currentPage}</button></Link>
            </div>
          }

          {/* Page after current page */}
          {Number(currentPage) !== Number(arrayIndex) && Number(currentPage) !== Number(arrayIndex - 1) &&
            <div className="paginationBtn">
              <Link to={cat ? `/?cat=${cat}&page=${Number(Number(currentPage) + 1)}&sort=${sortType}` : `/?page=${Number(Number(currentPage) + 1)}&sort=${sortType}`}><button>{Number(currentPage) + 1}</button></Link>
            </div>
          }

          {/* Dots for the later */}
          {Number(arrayIndex) - Number(currentPage) >= 3 && <div className="paginationBtn">
            <Link><button>...</button></Link>
          </div>}

          {/* Button to dispaly last number i.e the  */}
          {Number(arrayIndex) !== 1 && <div className="paginationBtn">
            <Link to={cat ? `/?cat=${cat}&page=${Number(arrayIndex)}&sort=${sortType}` : `/?page=${Number(arrayIndex)}&sort=${sortType}`}><button className={Number(currentPage) === Number(arrayIndex) ? 'active' : ''}>{arrayIndex}</button></Link>
          </div>}

          {/* Dynamic Pagination with skip values ends */}

          {Number(currentPage) !== Number(arrayIndex) && <Link to={cat ? `/?cat=${cat}&page=${Number(currentPage) + 1}&sort=${sortType}` : `/?page=${Number(currentPage) + 1}&sort=${sortType}`}><FaChevronRight className='paginationBtn'></FaChevronRight></Link>}
        </div>
      </div>
    </div>
  )
}




export default Home
