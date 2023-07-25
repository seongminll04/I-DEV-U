import React,{useEffect} from 'react';

interface Props {
  onModal: string|null;
  closeSidebar:()=>void;
  closeModal:()=>void;
}
const Follow: React.FC<Props> = ({onModal, closeSidebar, closeModal}) => {
  useEffect(() => { //esc키로 끄기
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (onModal!==null) {closeModal()} else {closeSidebar()}
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModal,closeSidebar,closeModal]);

  return (
    <div className='sidebar_modal'>
      <h1>내 친구목록</h1>
      <hr />
      <div>
        <p>1</p>
        <p>2</p>
      </div>
    </div>
  );
};

export default Follow;