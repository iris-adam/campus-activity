import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    // 注册账号
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) alert('注册失败：' + error.message);
    else {
      alert('注册成功！请查收邮件验证');
      // 注册后自动创建用户资料
      if (data.user) {
        await supabase.from('profiles').insert([{ id: data.user.id, username: email.split('@')[0] }]);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('登录失败：' + error.message);
    else navigate('/'); // 登录成功跳首页
  };

  return (
    <div style={{ maxWidth: '300px', margin: '5rem auto' }}>
      <h2>登录 / 注册</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">登录</button>
        <button type="button" onClick={handleSignUp} style={{ backgroundColor: '#666', color: 'white' }}>
          注册
        </button>
      </form>
    </div>
  );
}