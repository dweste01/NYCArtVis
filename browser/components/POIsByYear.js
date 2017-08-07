import React from 'react';
import AnnualPOIs from './AnnualPOIs';

export default (props) => {

  const byYearArray = [];
  for (let y in props.byYear) {
    let yearObj = {
      'year': y,
      'pois': props.byYear[y]
    }
    byYearArray.push(yearObj);
  }

  return (
    <div className='col-md-6'>
      <div id="accordion" role="tablist" aria-multiselectable="true">
      {
        byYearArray.length>1 && byYearArray.map((yearobj, idx) => {
          let toggleCardId = yearobj.year + 'content';
          return (

              <div key={idx} className='card'>
                <div className='card-header' role='tab' id={yearobj.year}>
                  <h1 className='mb-0'>
                    <button className='btn btn-block collapsed' data-toggle='collapse' data-parent='#accordion' data-target={'#' + toggleCardId} aria-expanded='false' aria-controls={toggleCardId}>
                      {yearobj.year}
                    </button>
                  </h1>
                </div>

                <AnnualPOIs pois={yearobj.pois} cardId={toggleCardId} controlId={yearobj.year} />

              </div>
          )
        })
      }
      </div>
    </div>
  )
}