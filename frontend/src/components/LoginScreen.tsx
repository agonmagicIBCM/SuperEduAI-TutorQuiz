import { useEffect, useState, type FormEvent } from 'react'
import './LoginScreen.css'

type AccountRole = 'Student' | 'Lecturer' | 'Admin'
type LoginScreenProps = { onSignIn: (role: AccountRole, username: string) => void }

function RoleIcon({ role }: { role: AccountRole }) {
  if (role === 'Student') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 9 8.5-4 8.5 4-8.5 4-8.5-4Z"/><path d="M7 10.7v4.1c2.9 2.4 7.1 2.4 10 0v-4.1M20.5 9v5"/></svg>
  if (role === 'Lecturer') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z"/><circle cx="12" cy="8" r="1.8"/><path d="M8.7 13.2c.4-1.3 1.5-2 3.3-2s2.9.7 3.3 2M8 15.5h8m-7.5 2h1m5 0h1"/></svg>
  return <svg className="login-role-icon--admin" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5a5 5 0 0 0-6.2 6.2L3.8 17a2.1 2.1 0 0 0 3 3l4.3-4.5a5 5 0 0 0 6.2-6.2l-3 3-3.4-3.4 3.6-2.4Z"/></svg>
}

function LoginScreen({ onSignIn }: LoginScreenProps) {
  const [screenLoading, setScreenLoading] = useState(true)
  const [role, setRole] = useState<AccountRole>('Student')
  const [roleOpen, setRoleOpen] = useState(false)
  const [requesting, setRequesting] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setScreenLoading(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    if (requesting) {
      setMessage('Your request is ready. Connect an account service to submit it.')
      return
    }
    setLoading(true)
    setScreenLoading(true)
    window.setTimeout(() => {
      onSignIn(role, username.trim())
    }, 950)
  }

  return (
    <main className={`login-screen${screenLoading ? ' login-screen--loading' : ''}`}>
      <div className="login-orb login-orb--one" aria-hidden="true" />
      <div className="login-orb login-orb--two" aria-hidden="true" />
      {screenLoading ? <div className="login-screen-loader" role="status" aria-label="Loading sign in"><span /></div> : <section className={`login-card${requesting ? ' login-card--request' : ''}`} aria-label={requesting ? 'Request an account' : 'Sign in'}>
        <div className="login-role-wrap">
          <span className="login-role-prefix">I am a</span>
          <div className="login-role-select">
            <button className={`login-role-trigger${roleOpen ? ' is-open' : ''}`} type="button" aria-expanded={roleOpen} onClick={() => setRoleOpen(!roleOpen)}>
              <span className="login-role-icon"><RoleIcon role={role} /></span><span>{role}</span><svg className="login-role-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
            </button>
            {roleOpen && <div className="login-role-menu" role="listbox" aria-label="Choose your role">
              {(['Student', 'Lecturer', 'Admin'] as AccountRole[]).filter((option) => option !== role).map((option) => <button key={option} type="button" role="option" aria-selected={false} onClick={() => { setRole(option); setRoleOpen(false) }}><span className="login-role-icon"><RoleIcon role={option} /></span>{option}</button>)}
            </div>}
          </div>
        </div>

        <form className="login-form" onSubmit={submit}>
          {requesting && <label className="login-field"><span>Email address</span><input type="email" autoComplete="email" placeholder="you@school.edu" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>}
          <label className="login-field"><span>{requesting ? 'Full name' : 'Username'}</span><input autoComplete="username" placeholder={requesting ? 'Your name' : 'Username'} value={username} onChange={(event) => setUsername(event.target.value)} required /></label>
          {!requesting && <label className="login-field"><span>Password</span><input type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>}
          {requesting && <label className="login-field"><span>Why do you need access?</span><textarea placeholder="Tell us a little about your role" rows={3} required /></label>}
          <button className="login-submit" type="submit" disabled={loading}>{loading ? <><span className="login-spinner" />Signing in</> : requesting ? 'Send request' : 'Sign in'}</button>
          {message && <p className="login-message" role="status">{message}</p>}
        </form>
        <p className="login-switch">{requesting ? 'Already have an account?' : 'Don’t have an account?'} <button type="button" onClick={() => { setRequesting(!requesting); setMessage('') }}>{requesting ? 'Sign in' : 'Request one.'}</button></p>
      </section>}
    </main>
  )
}

export default LoginScreen
