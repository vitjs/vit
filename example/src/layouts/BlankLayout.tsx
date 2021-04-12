import Block from '@/components/Block';

const Layout: React.FC = ({ children }) => {
  return (
    <Block>
      <h2>Vit App - Blank Layout</h2>
      {children}
    </Block>
  );
};

export default Layout;
