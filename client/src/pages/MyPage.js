import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMembers } from "../apis/base";
import { Btn } from "../components/Button";
import { ChallengeState } from "../components/Challenge";
import { MypageHeader } from "../components/Header";
import { TwoBtnModal } from "../components/Modal";
import { MypageSetting } from "../components/MypageSetting";
import { NavTitle } from "../components/NavItem";
import theme from "../components/theme";
import { signout, getLoginUser } from "../redux/userSlice";

export const MyPage = (props) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [logoutModal, setLogoutModal] = useState(false);
	const [quitModal, setQuitModal] = useState(false);

	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);

	useEffect(() => {
		getUserInfo();
	}, []);

	const getUserInfo = async () => {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/members/${loginUserInfo.memberId}`,
				{
					headers: {
						Authorization: `Bearer ${loginUserInfo.accessToken}`,
					},
					withCredentials: true,
				},
			);
			// console.log(result.data);
			dispatch(
				getLoginUser({
					...loginUserInfo,
					name: result.data.name,
					profileImageId: result.data.profileImageId,
				}),
			);
			// console.log(loginUserInfo);
		} catch (e) {
			console.log(e);
		}
	};

	const deleteUser = async () => {
		try {
			const result = await axios.delete(
				`${process.env.REACT_APP_SERVER_URL}/api/members/${loginUserInfo.memberId}`,
				{
					headers: {
						Authorization: `Bearer ${loginUserInfo.accessToken}`,
					},
					withCredentials: true,
				},
			);
			console.log(result);
			localStorage.removeItem("authorization");
			dispatch(getLoginUser(""));
			dispatch(signout());
			// navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	const isLogin = useSelector((state) => state.loginStatus.status);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const modalToLogout = () => {
		setLogoutModal(!logoutModal);
	};

	const onClickToLogout = () => {
		dispatch(signout());
		navigate("/");
	};

	const modalToQuit = () => {
		setQuitModal(!quitModal);
	};

	const onClickToQuit = () => {
		deleteUser();
	};

	return (
		<MypageWrapper>
			{logoutModal && (
				<TwoBtnModal
					modalText="로그아웃 하시겠습니까?"
					btnTextOrg="로그아웃"
					btnTextGry="취소"
					onClickGry={modalToLogout}
					onClickOrg={onClickToLogout}
				/>
			)}
			{quitModal && (
				<TwoBtnModal
					modalText="정말 탈퇴하시겠습니까?"
					btnTextOrg="탈퇴"
					btnTextGry="취소"
					onClickGry={modalToQuit}
					onClickOrg={onClickToQuit}
				/>
			)}
			<MypageHeader title="마이페이지" onClick={toggleMenu} />
			{isLogin ? (
				<>
					<MypageSetting
						menuOpen={menuOpen}
						modalToLogout={modalToLogout}
						modalToQuit={modalToQuit}
						onClick={toggleMenu}
					/>
					<div />
					<div className="userInfo">
						<img src={props.imgURL || "/images/미모티콘.png"} alt="avatar" />

						{loginUserInfo.name || "유저이름"}
					</div>
					<ChallengeState />
					<div className="challengeNav">
						<NavTitle title="생성한 챌린지" link="/userCreate" />
						<NavTitle title="완료한 챌린지" link="/userComplete" />
					</div>
					<div />
				</>
			) : (
				<div className="noneLogin">
					<p>로그인이 필요해요..</p>
					<p>로그인 하러 가기</p>
					<Link to="/login">
						<Btn btnText="클릭" background={theme.color.green} />
					</Link>
				</div>
			)}
		</MypageWrapper>
	);
};

const MypageWrapper = styled.div`
	/* border: 1px solid orange; */
	/* background-color: aliceblue; */
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	gap: 2rem;

	.challengeNav {
		width: 100%;
	}

	.userInfo {
		/* border: 1px solid blue; */
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 3rem;
		font-size: 1.5rem;
		padding: 1rem;

		img {
			border: 1px solid black;
			width: 45%;
			height: 45%;
			border-radius: 50%;
		}
	}

	.noneLogin {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		gap: 1rem;
	}
`;
