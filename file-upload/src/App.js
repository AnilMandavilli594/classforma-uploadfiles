import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App(){
  const [selectedFile,setSelectedFile] = useState(null);
  const [uploadList,setUploadList] = useState([]);
    const onChangeHandler = event=>{
      setSelectedFile(event.target.files);
    }
    const onClickHandler = () =>{
      const data = new FormData();
       for(var x = 0; x<selectedFile.length; x++) {
         data.append('doc', selectedFile[x])
     }
      axios.post("http://localhost:8000/upload-new",data,{

      }).then(res=>{
        setUploadList(res.data);
      })
    }
  return (
    <div class="container">
	    <div class="row">
	      <div class="col-md-6">
	        <form method="post" action="#" id="#">    
              <div class="form-group files">
                <label>Upload Your File </label>
                <input type="file" name="file" className="form-control" multiple onChange={onChangeHandler}/>
              </div>
          </form>
	      </div>
	    </div>
      <div>
        <button type="button" className="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>
      </div>
      
      <div className="example">
        <br/>
        <b>You uploaded</b>
        {
          uploadList.map(data=><li>{data}</li>)
        }
      </div>
    </div>
  );
}

export default App;
