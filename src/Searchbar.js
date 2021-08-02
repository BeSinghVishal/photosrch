import React,{useState,useEffect, useRef} from 'react'

import './css/App.css'

const Search=(props)=>{
    const[text,setText]=useState('');
    const[data,setData]=useState([]);
    const[isvis,setIsVis]=useState(0);
    const refrence=useRef(null);

    useEffect(()=>{
        if(!text){
        let dbs=[];
        if(!text){
            fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=36f5e702264544aab9594162134b2764&text=${text}&per_page=10&page=1&format=json&nojsoncallback=1`)
            .then(v=>v.json())
            .then(({photos})=>{
            //console.log(photos);
            const {photo}=photos;
            photo.forEach(({id,server,secret,title}) => {
               const url=`https://live.staticflickr.com/${server}/${id}_${secret}_c.jpg`;
               const itm= <section className="im">
                       <a  target="_blank" href={`https://live.staticflickr.com/${server}/${id}_${secret}_c.jpg`} download="img"><img src={url} alt={title}/></a>
                       </section>
                
               dbs.push(itm);
            })  
                setData(dbs);    
        });
        }
    }
    },[text])
   

  
    useEffect(()=>{
        let dbs=[];
    
        {text&&fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=36f5e702264544aab9594162134b2764&text=${text}&per_page=10&page=1&format=json&nojsoncallback=1`)
        .then((dt)=>dt.json())
        .then(({photos})=>{
            console.log(photos);
            const {photo}=photos;
            photo.forEach(({id,server,secret,title}) => {
               const url=`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`;
               const itm=<section className="im">
                       <a  target="_blank" href={`https://live.staticflickr.com/${server}/${id}_${secret}_c.jpg`} download="img"><img src={url} alt={title}/></a>
                       </section>
                    
               dbs.push(itm);
            })  
                text&&setData(dbs);    
        });
    }
    if(text===''){
setData([]);
setIsVis(0);
    }

    },[text]);


    const handler=(eve)=>{
        if(isvis==0){
setIsVis(1); 
        }

        let timeout=null;
clearTimeout(timeout);
    timeout = setTimeout(()=> {
        setText(eve.target.value);
        }, 1300);
    }
    const psvalue=()=>{
        //   props.func(text);
         
    }
    const clear=()=>{
        refrence.current.value='';
        setText('');
    }
    return(
        <section>
        <section className="modview">
        <section className="sbox">
 <label for="searchbar">Photo Search</label>
     <section className="sb"><input type="text" name="searchbar" className="searchbar" ref={refrence} onChange={handler} placeholder="enter text here..."/>
      <button className="clk" onClick={clear}>clear</button>
     {isvis?<section className="sug">

{setTimeout(()=>{
    setIsVis(0);
},3000)}
          </section>:''}
          </section>   
      </section>
       
      </section>
      <section className="ot">
          {data.map(vl=>vl)}
          </section>

    
      {/* {isvis&&<Searchresult txt={text}/>} */}
     
      </section>
    );
}

export default Search;

//  <section className="rslt">
//          {
//          data && data.map((val)=>{
//            return val;
//          })       
// }
// {text&&<section className="more">
//          <button className="clck" onClick={psvalue}> Show More..</button>
//           </section>}
         
//       </section>