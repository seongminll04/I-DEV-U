import styled from 'styled-components';

export const Background = styled.div`
  background: url(../assets/loginimage.png) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const Modal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  border: 4px solid deepskyblue; // 여기 테두리 우리색깔
`;

export const Logo = styled.img`
  background: url('../assets/logo.png') no-repeat center;
  height: 100px; // Adjust this as needed
  width: 100px; // Adjust this as needed
  margin-bottom: 3em;
`;

export const Input = styled.input`
  padding: 1em;
  margin: 0.5em;
  color: black;
  background: white;
  border: 1px solid black;
  border-radius: 3px;
  width: 73%;
`;

export const Button = styled.button`
  background: ${props => props.color || 'white'};
  color: black;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 3px;
  width: 80%;
  transition: all 0.3s ease;

  &:hover {
    background: lightgray;
    cursor: pointer;
  }

  &:active {
    background: darkgray;
  }
`;

export const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  margin: 0.5em 0;
`;

export const Check = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5em;
`;

export const Text = styled.p`
  color: black;
  margin: 0.5em;
`;

export const Link = styled.a`
  color: black;
  text-decoration: none;
  &:last-child {
    margin-left: auto;
  }
`;

export const Separator = styled.hr`
  width: 80%;
  margin: 5px auto; // Margin reduced
`;
