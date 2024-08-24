"use client"

const GenericErrorComponent = (props: any) => {

const eMsg = props.errorMessage;
const eUrl1 = props.url1;
const eUrl2 = props.url2;

  return (
    <div>
      {eMsg}<br />
      <a href={eUrl1}>{eUrl1}</a><br />
      <a href={eUrl2}>{eUrl2}</a><br />
    </div>
  )
}
export default GenericErrorComponent
