export default function Post({id,title,content,authorName}){
    return(
        <div style={{border:'1px  solid white',padding:'15px'}}>
            <h3>{authorName}</h3> 
            <h3>{title}</h3> 
            <h3>{content}</h3> 

        </div>
    )
}