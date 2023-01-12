import theme from "./theme";
import styled, { ThemeProvider } from "styled-components";
import Btn from "./Button";

//props : 댓글 내용
const Comment = (props ) => {
	return (
		<ThemeProvider theme={theme}>
			<CommentContainer>
				{props.comment}
				<div>
					<Btn
						btnText={"수정"}
						background={theme.color.green}
						width={"4rem"}
						height={"2.5rem"}
						size={"1rem"}
					/>
					<Btn
						btnText={"삭제"}
						background={theme.color.gray}
						color={theme.color.navy}
						width={"4rem"}
						height={"2.5rem"}
						size={"1rem"}
					/>
				</div>
			</CommentContainer>
		</ThemeProvider>
	);
};

const CommentContainer = styled.div`
	width: 364px;
	height: 52px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 1rem;
	line-height: 3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export default Comment;