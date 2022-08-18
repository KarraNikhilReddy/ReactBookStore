import React from "react";

function MyBookCard(props) {
  const { bookName, bookId, description, author, category } = props;



 

  let photo=""
  let defaultPhoto=""
try{
   photo = require(`../Photos/${bookName}.webp`)
}
catch {
  defaultPhoto = require(`../Photos/defaultBookImg.jpg`)
}
 



  return (

    
    <>
      <div className="card container col-4" >
   {/*    <div className="card container col-4" style={{ width: "18rem" }}> */}
        <img
          /* src={require("../Photos/testPic.jpg")} */
          src={photo}
          onError={(e) => {
            e.target.src = defaultPhoto 
         }}
        /*  width="" height="100%" */
          
        />
        <div className="card-body">
          <h5 className="card-title">{bookName}</h5>
          <p className="card-text">Author : {author}</p>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={"#modal"+bookId}
          >
           Open Book
          </button>

          <div
            className="modal fade"
            id={"modal"+bookId}
            tabIndex={-1}
            aria-labelledby={bookId+"ModalLabel"}
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id={bookId+"ModalLabel"}>
                    {bookName}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">{description}</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                 {/*  <button type="button" className="btn btn-primary">
                    Save changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBookCard;
