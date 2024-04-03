import Alert from "./alert";
import Footer from "./footer";
import Header from "./header/Header";
import Meta from "./meta";

export default function Layout({ preview, menuItems, children }: any) {
  return (
    <>
      <Meta />
      <Header menu={menuItems} />
      <div className="min-h-screen">
        {preview && <Alert preview={preview} />}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
