import React,{useEffect,useState} from 'react';
import {withRouter} from 'react-router-dom';
import Row from './row';
import axios from "axios";

var allSubmissions=[];
function Submission(props) {

    const [submissions,setSubmissions] = useState([]);

    const [focusInp, setFocusInp] = useState(false);
    const [srchtxt, setSrchtxt] = useState("");

   useEffect(()=>{

     axios.get(`/frontend/submissions/all/test/${props.match.params.id}`)
       .then(res=>{
         if(res.data.success){
          const submissionsArr=[];
          for(let i=0;i<res.data.submissions.length;i++){
            for(let j=0;j<res.data.submissions[i].submissions.length;j++){
              submissionsArr.push({name:res.data.submissions[i].userId.name,...res.data.submissions[i].submissions[j]});
            }
          }
           console.log(res.data.submissions);
           allSubmissions=submissionsArr;
           setSubmissions(submissionsArr);
         }else{
           console.log(res.data.msg);
         }
       })
       .catch(err=>{
         console.log(err.message);
       })


   },[])

   function srchHandler(e){
    if(e.target.value){
      setSubmissions(allSubmissions.filter(sub=>sub.name?sub.name.toLowerCase().includes(e.target.value.toLowerCase()) :false));
    }else{
      setSubmissions(allSubmissions);
    }
    setSrchtxt(e.target.value);
  }


    return (
        <div className="p-3" >
            <h3 className="mb-3" ><b> Your Submissions </b></h3>

            <div className={focusInp?"srch focus ml-0 mb-5":"srch ml-0 mb-5"}>
                <input type="text" onFocus={()=>{setFocusInp(true)}} onBlur={()=>{setFocusInp(false)}} value={srchtxt} onChange={(e)=>{srchHandler(e)}}  placeholder="Type to Search Questions" ></input>
                <span className="float-right pr-3 srchIcon"><i className="fa fa-search"></i></span>
            </div>

            <div className="p-3">
                <div className="row py-2" style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}} >
                    <div className="col-1"> <b>Sr. No.</b> </div>
                    <div className="col-4"> <b> Name </b> </div>
                    <div className="col-4"> <b>Points</b>  </div>
                    <div className="col-3"> </div>
                </div>
                {submissions.map((sub,i)=>(
                  <Row index={i+1}  points={sub.marks} html={sub.html} css={sub.css} js={sub.js} name={sub.name} />
                ))}

            </div>
        </div>
    )
}

export default withRouter(Submission);
