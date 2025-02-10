import SimpleNavbar from '../components/SimpleNavbar'

export default function BulletLayout({
    children, 
  }) {
    return (
      <section>
        <SimpleNavbar></SimpleNavbar>
   
        {children}
      </section>
    )
  }