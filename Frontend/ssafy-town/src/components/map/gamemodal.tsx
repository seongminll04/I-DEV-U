import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

const GameModal: React.FC = () => {
    const dispatch = useDispatch();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 20, y: 20 });
    const [foodCount, setFoodCount] = useState(0); // 먹이를 먹은 횟수
    const [speed, setSpeed] = useState(100); // 게임의 속도 (밀리세컨드)
    const [dx, setDx] = useState(1);
    const [dy, setDy] = useState(0);
    const [level, setLevel] = useState(1);
    const foodsForLevelUp = 10; // 한 레벨을 올리기 위해 필요한 먹이 수
    const [foodsToNextLevel, setFoodsToNextLevel] = useState(foodsForLevelUp - foodCount % foodsForLevelUp);
    const [directionsQueue, setDirectionsQueue] = useState<Array<{ dx: number, dy: number }>>([]);


  useEffect(() => {
    const interval = setInterval(() => {
        if (directionsQueue.length > 0) {
            const nextDirection = directionsQueue[0];
            setDx(nextDirection.dx);
            setDy(nextDirection.dy);
            setDirectionsQueue(prev => prev.slice(1));
        }
      // Update snake's position
      let head = { ...snake[0] };
      head.x += dx;
      head.y += dy;

          // Check for collision with wall
    if (head.x < -1 || head.x >= 31 || head.y < -1 || head.y >= 31) {
        clearInterval(interval);
        alert("게임 오버: 벽에 부딪혔습니다!");
        dispatch(setModal(null));
        return;
      }
  
      // Check for collision with self
      for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          clearInterval(interval);
          alert("게임 오버: 자신의 몸에 부딪혔습니다!");
          dispatch(setModal(null));
          return;
        }
      }

        // 먹이를 먹은 경우
        if (head.x === food.x && head.y === food.y) {
            setFoodCount(prevCount => {
                const newCount = prevCount + 1;
                if (newCount % foodsForLevelUp === 0) {
                    clearInterval(interval); // 이전 인터벌을 정지
                    setSpeed(prevSpeed => prevSpeed / 1.2); // 속도 증가
                    setLevel(prevLevel => prevLevel + 1); // 레벨 상승
                }
                setFoodsToNextLevel(foodsForLevelUp - newCount % foodsForLevelUp); // 다음 레벨로의 먹이 계산
                return newCount;
            });
        }

        // 게임 클리어 조건
        if (snake.length === 100) {
        clearInterval(interval);
        alert("게임 클리어!");
        dispatch(setModal(null));
        return;
        }

      // Check for food
      if (head.x === food.x && head.y === food.y) {
        let newSnake = [...snake];
        newSnake.unshift(head);

        setSnake(newSnake);

        // Generate new food
        let newFood = {
          x: Math.floor(Math.random() * 30),
          y: Math.floor(Math.random() * 30),
        };
        setFood(newFood);
      } else {
        let newSnake = [...snake];
        newSnake.unshift(head);
        newSnake.pop();
        setSnake(newSnake);
      }

      // Draw
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 300, 300);
        ctx.fillStyle = 'green';
        snake.forEach((segment) => {
          ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
        });
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [snake, food, dx, dy, dispatch, speed,directionsQueue]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        let newDirection: { dx: number, dy: number } | null = null;
        if (e.key === 'ArrowUp' && dy === 0 && directionsQueue.length === 0) {
            newDirection = { dx: 0, dy: -1 };
        } else if (e.key === 'ArrowDown' && dy === 0 && directionsQueue.length === 0) {
            newDirection = { dx: 0, dy: 1 };
        } else if (e.key === 'ArrowLeft' && dx === 0 && directionsQueue.length === 0) {
            newDirection = { dx: -1, dy: 0 };
        } else if (e.key === 'ArrowRight' && dx === 0 && directionsQueue.length === 0) {
            newDirection = { dx: 1, dy: 0 };
        }

        if (newDirection) {
            setDirectionsQueue(prev => [...prev, newDirection!]);
        }
    };


    return (
        <div
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Arial", sans-serif',
        }}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
                dispatch(setModal(null));
            }
        }}
        >
        <div
            style={{
                backgroundColor: '#f4f4f4',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1 style={{ color: '#333',fontWeight: 'bold', marginBottom: '10px' }}>🐍 스네이크 게임 🐍</h1>
            <p style={{ color: '#555', marginBottom: '8px'  }}>📈레벨: {level}</p>
            <p style={{ color: '#555', marginBottom: '8px'  }}>🍖먹은 먹이의 개수: {foodCount}</p>
            <p style={{ color: '#555', marginBottom: '8px'  }}>🏋️‍♂️다음 레벨까지 먹이: {foodsToNextLevel}</p>
            <p style={{ color: 'red', fontSize: '15px', marginBottom: '10px' }}>※주의 : 모달 밖을 클릭하면 종료됩니다.</p>
            <canvas ref={canvasRef} width={300} height={300} style={{ border: '2px solid #333', marginBottom: '20px' }}></canvas>
            <button 
                onClick={() => dispatch(setModal(null))}
                style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#555'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#333'}
            >
            닫기
            </button>
        </div>
        </div>
    );
}

export default GameModal;
