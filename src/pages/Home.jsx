import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null);

  // 获取登录用户信息
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getCurrentUser();
  }, []);

  // 获取已审核的活动
  useEffect(() => {
    const fetchActivities = async () => {
      const { data } = await supabase
        .from('activities')
        .select('*')
        .eq('status', 'approved')
        .order('start_time', { ascending: true });
      setActivities(data || []);
    };
    fetchActivities();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>校园活动平台</h1>
        {user ? (
          <span>欢迎，{user.email}</span>
        ) : (
          <Link to="/login" style={{ padding: '0.5rem 1rem', background: 'blue', color: 'white', textDecoration: 'none' }}>
            登录
          </Link>
        )}
      </div>

      <h2>最新活动</h2>
      <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
        {activities.map((activity) => (
          <div key={activity.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <h3>{activity.title}</h3>
            <p>时间：{new Date(activity.start_time).toLocaleString()}</p>
            <p>地点：{activity.location}</p>
            <Link to={`/activities/${activity.id}`} style={{ color: 'blue' }}>查看详情 →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}