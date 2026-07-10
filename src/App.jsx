import React, { useState, useEffect } from 'react';

export default function GamifiedPlannerApp() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [schedule, setSchedule] = useState({
    Monday: ['9:00-10:00 책읽기', '10:30-11:30 영어공부', '14:00-15:00 운동'],
    Tuesday: ['9:00-10:00 프로젝트', '11:00-12:00 회의'],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  const [completedTasks, setCompletedTasks] = useState({});
  const [userStats, setUserStats] = useState({
    totalPoints: 0,
    streak: 0,
    completedCount: 0
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [uploadedEvidence, setUploadedEvidence] = useState({});
  const [taskVerification, setTaskVerification] = useState({});

  // 모의 리그보더 데이터
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: '김철수', points: 8500, avatar: 'KC' },
    { id: 2, name: '이영희', points: 7200, avatar: 'LY' },
    { id: 3, name: '박민준', points: 6800, avatar: 'PM' },
    { id: 4, name: '현재 사용자', points: 4300, avatar: 'CU', isCurrentUser: true }
  ]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];

  const handleLogin = (loginType) => {
    setUser({ name: 'User', loginType, id: Math.random() });
    setCurrentPage('planner');
  };

  const parseTime = (timeStr) => {
    const match = timeStr.match(/(\d+):(\d+)-(\d+):(\d+)/);
    if (!match) return { start: 0, end: 0, duration: 0 };
    const startHour = parseInt(match[1]);
    const endHour = parseInt(match[3]);
    const duration = endHour - startHour;
    return { start: startHour, end: endHour, duration };
  };

  const calculatePoints = (taskStr, isStreak) => {
    const { duration } = parseTime(taskStr);
    let points = duration * 100;
    if (isStreak) points = Math.floor(points * 1.2);
    return points;
  };

  const handleTaskClick = (day, taskStr) => {
    setSelectedTask({ day, task: taskStr, index: schedule[day].indexOf(taskStr) });
  };

  const handleEvidenceUpload = (file, type) => {
    const taskKey = `${selectedTask.day}-${selectedTask.index}`;
    setUploadedEvidence({
      ...uploadedEvidence,
      [taskKey]: {
        name: file.name,
        type: type,
        uploadedAt: new Date().toLocaleString('ko-KR')
      }
    });

    setTimeout(() => {
      const isVerified = Math.random() > 0.3;
      setTaskVerification({
        ...taskVerification,
        [taskKey]: isVerified ? 'verified' : 'rejected'
      });

      if (isVerified) {
        const points = calculatePoints(selectedTask.task, false);
        setUserStats({
          ...userStats,
          totalPoints: userStats.totalPoints + points,
          completedCount: userStats.completedCount + 1
        });
      }
    }, 2000);
  };

  const handleCompleteTask = () => {
    const taskKey = `${selectedTask.day}-${selectedTask.index}`;
    if (uploadedEvidence[taskKey]) {
      alert('증거가 검증 중입니다. 잠시만 기다려주세요.');
    } else {
      alert('먼저 사진이나 동영상을 업로드해주세요.');
    }
  };

  // Login Page
  if (currentPage === 'login') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            Planner Pro
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#666',
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            목표를 달성하고 포인트를 모으세요
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => handleLogin('google')}
              style={{
                padding: '14px 20px',
                fontSize: '15px',
                fontWeight: '500',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f5f5f5';
                e.target.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#e0e0e0';
              }}
            >
              <i className="ti ti-brand-google" style={{ fontSize: '20px' }}></i>
              Google로 계속하기
            </button>

            <button
              onClick={() => handleLogin('apple')}
              style={{
                padding: '14px 20px',
                fontSize: '15px',
                fontWeight: '500',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f5f5f5';
                e.target.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#e0e0e0';
              }}
            >
              <i className="ti ti-brand-apple" style={{ fontSize: '20px' }}></i>
              Apple로 계속하기
            </button>

            <button
              onClick={() => handleLogin('guest')}
              style={{
                padding: '14px 20px',
                fontSize: '15px',
                fontWeight: '500',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f5f5f5';
                e.target.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#e0e0e0';
              }}
            >
              <i className="ti ti-user" style={{ fontSize: '20px' }}></i>
              게스트로 계속하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Planner Page
  if (currentPage === 'planner') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <div style={{
          background: 'white',
          borderBottom: '1px solid #e0e0e0',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
            📅 플래너
          </h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setCurrentPage('stats')}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                background: '#f0f0f0',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              <i className="ti ti-star" style={{ marginRight: '6px' }}></i>
              {userStats.totalPoints}P
            </button>
            <button
              onClick={() => setCurrentPage('leaderboard')}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                background: '#f0f0f0',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              <i className="ti ti-trophy" style={{ marginRight: '6px' }}></i>
              순위
            </button>
          </div>
        </div>

        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '32px'
          }}>
            {days.map((day, index) => (
              <div key={day} style={{
                background: 'white',
                borderRadius: '12px',
                padding: '12px',
                border: '1px solid #e0e0e0',
                minHeight: '100px'
              }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  marginBottom: '8px'
                }}>
                  {dayLabels[index]}요일
                </h3>
                <div style={{
                  fontSize: '12px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  {schedule[day].length > 0 ? (
                    <div>{schedule[day].length}개 일정</div>
                  ) : (
                    <div style={{ color: '#999' }}>일정 없음</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '16px'
          }}>
            오늘의 일정
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {schedule['Monday'].map((task, index) => {
              const taskKey = `Monday-${index}`;
              const isVerified = taskVerification[taskKey] === 'verified';
              const isPending = uploadedEvidence[taskKey] && !taskVerification[taskKey];

              return (
                <div
                  key={taskKey}
                  onClick={() => handleTaskClick('Monday', task)}
                  style={{
                    background: isVerified ? '#e8f5e9' : 'white',
                    border: isVerified ? '1px solid #4caf50' : '1px solid #e0e0e0',
                    borderRadius: '10px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!isVerified) {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isVerified) {
                      e.currentTarget.style.borderColor = '#e0e0e0';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#1a1a1a',
                      marginBottom: '4px'
                    }}>
                      {task}
                    </div>
                    {isPending && (
                      <div style={{
                        fontSize: '12px',
                        color: '#ff9800'
                      }}>
                        ⏳ 검증 중...
                      </div>
                    )}
                  </div>
                  {isVerified && (
                    <div style={{
                      fontSize: '24px',
                      color: '#4caf50'
                    }}>
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Task Detail Modal
  if (selectedTask) {
    const taskKey = `${selectedTask.day}-${selectedTask.index}`;
    const evidence = uploadedEvidence[taskKey];
    const verification = taskVerification[taskKey];
    const { duration } = parseTime(selectedTask.task);
    const points = calculatePoints(selectedTask.task, false);

    return (
      <div style={{
        minHeight: '100vh',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
              {selectedTask.task}
            </h2>
            <button
              onClick={() => setSelectedTask(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          <div style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '10px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#666' }}>소요시간</span>
              <span style={{ fontWeight: '600' }}>{duration}시간</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>예상 포인트</span>
              <span style={{ fontWeight: '600', color: '#667eea' }}>{points}P</span>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' }}>
              📸 증거 자료 업로드
            </h3>
            <p style={{ fontSize: '13px', color: '#999', marginBottom: '12px' }}>
              실제 활동 중인 사진이나 동영상을 업로드하세요. (퍼온 자료나 관련 없는 이미지는 인정되지 않습니다)
            </p>

            {!evidence ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    const file = { name: '사진_' + new Date().getTime() + '.jpg' };
                    handleEvidenceUpload(file, 'photo');
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#e3f2fd',
                    border: '1px solid #90caf9',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: '#1976d2'
                  }}
                >
                  <i className="ti ti-photo" style={{ marginRight: '6px' }}></i>
                  사진 업로드
                </button>
                <button
                  onClick={() => {
                    const file = { name: '동영상_' + new Date().getTime() + '.mp4' };
                    handleEvidenceUpload(file, 'video');
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#f3e5f5',
                    border: '1px solid #ce93d8',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: '#7b1fa2'
                  }}
                >
                  <i className="ti ti-video" style={{ marginRight: '6px' }}></i>
                  동영상 업로드
                </button>
              </div>
            ) : (
              <div style={{
                background: '#f5f5f5',
                padding: '12px',
                borderRadius: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontWeight: '500' }}>
                    {evidence.type === 'photo' ? '📸' : '🎥'} {evidence.name}
                  </span>
                  {!verification && (
                    <button
                      onClick={() => {
                        setUploadedEvidence({
                          ...uploadedEvidence,
                          [taskKey]: null
                        });
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  업로드: {evidence.uploadedAt}
                </div>
                {verification === 'verified' && (
                  <div style={{
                    background: '#e8f5e9',
                    color: '#2e7d32',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    ✓ 검증 완료! {points}P 획득
                  </div>
                )}
                {verification === 'rejected' && (
                  <div style={{
                    background: '#ffebee',
                    color: '#c62828',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    ✕ 검증 실패. 실제 활동 자료를 업로드해주세요.
                  </div>
                )}
                {!verification && (
                  <div style={{
                    background: '#fff3e0',
                    color: '#e65100',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    ⏳ 검증 중입니다. 잠시만 기다려주세요...
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setSelectedTask(null)}
              style={{
                flex: 1,
                padding: '12px',
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Leaderboard Page
  if (currentPage === 'leaderboard') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <button
            onClick={() => setCurrentPage('planner')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              marginBottom: '20px',
              color: '#667eea',
              fontWeight: '600'
            }}
          >
            ← 돌아가기
          </button>

          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            🏆 월간 순위
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leaderboard.map((player, index) => (
              <div
                key={player.id}
                style={{
                  background: player.isCurrentUser ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                  border: player.isCurrentUser ? 'none' : '1px solid #e0e0e0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#667eea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  color: 'white',
                  fontSize: '16px'
                }}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: player.isCurrentUser ? 'white' : '#1a1a1a',
                    marginBottom: '4px'
                  }}>
                    {player.name}
                  </div>
                  {player.isCurrentUser && (
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      당신
                    </div>
                  )}
                </div>

                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: player.isCurrentUser ? 'white' : '#667eea'
                }}>
                  {player.points.toLocaleString()}P
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            marginTop: '32px',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '12px'
            }}>
              💡 포인트 획득 방법
            </h3>
            <ul style={{
              fontSize: '13px',
              color: '#666',
              lineHeight: '1.8',
              margin: 0,
              paddingLeft: '20px'
            }}>
              <li>기본: 1시간 활동 = 100포인트</li>
              <li>연속보너스: 3일 이상 연속 완료시 +20%</li>
              <li>월별 순위: 1등 1000P, 2등 500P, 3등 300P 추가</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Stats Page
  if (currentPage === 'stats') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <button
            onClick={() => setCurrentPage('planner')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              marginBottom: '20px',
              color: '#667eea',
              fontWeight: '600'
            }}
          >
            ← 돌아가기
          </button>

          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '32px'
          }}>
            📊 내 통계
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              padding: '20px',
              color: 'white'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>총 포인트</div>
              <div style={{ fontSize: '32px', fontWeight: '700' }}>{userStats.totalPoints.toLocaleString()}</div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '12px',
              padding: '20px',
              color: 'white'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>완료한 활동</div>
              <div style={{ fontSize: '32px', fontWeight: '700' }}>{userStats.completedCount}</div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              borderRadius: '12px',
              padding: '20px',
              color: 'white'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>연속 달성일</div>
              <div style={{ fontSize: '32px', fontWeight: '700' }}>{userStats.streak}</div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              borderRadius: '12px',
              padding: '20px',
              color: 'white'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>평균 포인트</div>
              <div style={{ fontSize: '32px', fontWeight: '700' }}>
                {userStats.completedCount > 0 ? Math.floor(userStats.totalPoints / userStats.completedCount) : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
