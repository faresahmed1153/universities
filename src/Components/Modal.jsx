import React from "react";

export default function Modal({ id, info, data }) {
  return (
    <>
      {data[0]?.message == "country" ? (
        <>
          <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body text-center">
                  <p>{info.universityName}</p>
                  <p>{info.domain}</p>
                  <p>{info.webPage}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {data[0]?.message == "university" ? (

        <>
          <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body text-center">
                  <p>{data[0].university.universityName}</p>
                  <p>{data[0].university.domain}</p>
                  <p>{data[0].university.webPage}</p>
                  <p>{data[0].university.countryId.countryName}</p>
                </div>
              </div>
            </div>
          </div>
          ;
        </>
      ) : (
        <></>
      )}
    </>
  );
}
