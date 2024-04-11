import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import moment from 'moment';

const StyledButton = styled(Button)({
	width: '84px',
	height: '38px',
	color: '#FFFFFF',
	backgroundColor: '#0F59A5'
});


const Comment = ({comment,currentUser,onDeleteComment}) => {
	const {userInfo} = comment;
	return (
		<div
			className="comment"
		>
			<div className="comment__user">
				<Avatar alt="Remy Sharp" src="https://picsum.photos/200/200" />
				<div>
					<div
						className="title">
						<h5>{`${userInfo.firstName}  ${userInfo.lastName}`}</h5>

						{/* <p className="role">Content Writer</p> */}
					</div>
					<div className="body">
						<p>{comment.comment}</p>
					</div>
				</div>
			</div>
			<div className="comment__detail">
				<p className="comment__time">{moment(comment.createdAt).fromNow()}</p>
			&nbsp;&nbsp;&nbsp;
		 {/* <Button onClick={() => onDeleteComment(comment.id)}><p className="comment__delete">Delete</p></Button> */}
			</div>

		</div>
	)
}

const CommentBox = (props) => {
	const [comment,setComment] = useState('');



	const addComment = () => {
		if(!comment){
			return;
		}
		props.onAddComment(comment, () => {
			setComment('')
		});
	}

	return (
		<div className="comment__box">
			<Avatar alt="Remy Sharp" src="https://picsum.photos/200/200" />
			<div className="input__box">
				<input type="text" value={comment}
				onChange={(e) => setComment(e.target.value)}
				className="input__box" placeholder="Write a comment" />
				<StyledButton onClick={addComment}>
					SEND
				  </StyledButton>
			</div>
		</div>
	)
}


const Comments = ({comments,deleteComment,addComment}) => {

	return (
		<div className="comments" >
			{comments.map((comment,index) => {
				return (
					<Comment key={index} comment={comment} onDeleteComment={deleteComment}/>
				)
			})}
			<CommentBox onAddComment={addComment}/>
		</div>


	)
}

export default Comments
