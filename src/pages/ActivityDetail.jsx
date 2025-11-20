import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ActivityDetail() {
  const { id } = useParams(); // 从 URL 获取活动 ID
  const [activity, setActivity] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 获取登录用户
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  // 获取活动详情
  useEffect(() => {
    if (!id) return;
    supabase
      .from('activities')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => setActivity(data));
  }, [id]);

  // 报名活动
  const handleRegister = async () => {
    if (!user) {
      navigate('/login'); // 未登录跳登录页
      return;
    }
    const { error } = await supabase.from('registrations').insert([
      { activity_id: id, user_id: user.id }
    ]);
    if (error) alert('报名失败：' + error.message);
    else alert('报名成功！');
  };

  if (!activity) return <div>加载中...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{activity.title}</h1>
      <p><strong>活动描述：</strong>{activity.description}</p>
      <p><strong>时间：</strong>{new Date(activity.start_time).toLocaleString()}</p>
      <p><strong>地点：</strong>{activity.location}</p>
      <button 
        onClick={handleRegister}
        style={{ padding: '0.5rem 1rem', background: 'green', color: 'white', border: 'none', borderRadius: '4px', marginTop: '1rem' }}
      >
        立即报名
      </button>
    </div>
  );
}