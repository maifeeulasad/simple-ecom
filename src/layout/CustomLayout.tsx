import React, { ReactNode, useEffect, useState } from 'react';
import type { MenuDataItem } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import { useLocation, Link } from 'react-router-dom';
import { notification, Input, Select, Form, Button, Affix, Space, Badge, Row, Col } from 'antd';
import { copyText } from 'copy-clipboard-js';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import { 
  ReloadOutlined, 
  SearchOutlined, 
  ShoppingCartOutlined,
  HeartOutlined,
  SwapOutlined,
  UserOutlined,
  LaptopOutlined,
  MobileOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import logo from './logo.svg';

const defaultMenus: MenuDataItem[] = [
  {
    path: '/landing',
    name: 'Laptops',
    icon: <LaptopOutlined />,
  },
  {
    path: '/mobiles',
    name: 'Mobiles',
    icon: <MobileOutlined />,
  },
  {
    path: '/desktops',
    name: 'Desktops', 
    icon: <DesktopOutlined />,
  },
  {
    path: '/',
    name: 'More Categories',
    children: [
      {
        path: '/page2',
        name: 'Gaming',
      },
      {
        path: '/page1',
        name: 'Accessories',
      },
      {
        path: '/page3',
        name: 'Components',
      },
    ],
  },
];

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon,
    children: children && loopMenuItem(children),
    path: item.path,
  }));

interface ICustomFooterMenuProps {
  collapsed?: boolean;
}

// @ts-ignore
const TRACE: string = __HEAD_COMMIT_HASH__;

const CustomFooterMenu = ({ collapsed }: ICustomFooterMenuProps) => {
  const [api, contextHolder] = notification.useNotification();

  const copyLink = () => {
    copyText(TRACE);
    api.open({
      key: TRACE,
      message: 'Trace ID copied to clipboard',
      description: `ID: ${TRACE}`,
      duration: 2,
      closeIcon: <div />,
    });
  };

  if (collapsed) return undefined;
  return (
    <>
      {contextHolder}
      <div style={{ textAlign: 'center' }}>
        <div style={{ textAlign: 'center', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
          <div>
            { /* @ts-ignore */}
            {TRACE ? `Trace: ${TRACE}` : ''}
            <CopyOutlined onClick={() => copyLink()} />
          </div>
          <div>
            &copy; {new Date().getFullYear()} - Maifee Ul Asad
          </div>
        </div>
      </div>
    </>
  );
};

const SearchBar = () => {
  const categories = ['All Products', 'Laptops', 'Mobiles', 'Desktops', 'Gaming', 'Accessories'];
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  const [resetVisibility, setResetVisibility] = useState(true);

  const onValuesChange = (changedValues: any) => {
    console.log('Form changed:', changedValues);
    const { category, keyword } = changedValues;
    console.log('Search triggered with:', { category, keyword });
    setResetVisibility(category === undefined && (keyword === undefined || keyword === ''));
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      padding: '8px 16px',
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderBottom: '1px solid #f0f0f0',
    }}>
      <Row style={{ width: '100%' }} justify="space-between" align="middle" gutter={16}>
        <Col flex="1">
          <Form
            form={form}
            layout="inline"
            onValuesChange={onValuesChange}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            style={{ display: 'flex', width: '100%', gap: 8 }}
          >
            <Form.Item
              name="category"
              style={{ marginBottom: 0, height: '100%' }}
            >
              <Select
                defaultValue={categories[0] || ''}
                options={categories.map((category) => ({ label: category, value: category }))}
                style={{ width: 140, height: '100%' }}
                placeholder="Category"
              />
            </Form.Item>

            <Form.Item
              style={{ flex: 1, marginBottom: 0 }}
              name="keyword"
            >
              <Input
                placeholder="Search for laptops, mobiles, accessories..."
                style={{ width: '100%' }}
                suffix={
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    style={{ border: 'none', boxShadow: 'none' }}
                  />
                }
              />
            </Form.Item>
            
            {!resetVisibility && (
              <Form.Item>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => form.resetFields()}
                  style={{ border: 'none' }}
                />
              </Form.Item>
            )}
          </Form>
        </Col>
        
        <Col>
          <Space size="large">
            <Button type="text" icon={<HeartOutlined />} style={{ color: '#666' }}>
              <span>Wishlist</span>
            </Button>
            <Button type="text" icon={<SwapOutlined />} style={{ color: '#666' }}>
              <span>Compare (0)</span>
            </Button>
            <Badge count={0} showZero>
              <Button type="text" icon={<ShoppingCartOutlined />} style={{ color: '#666' }}>
                <span>Cart</span>
              </Button>
            </Badge>
            <Button type="text" icon={<UserOutlined />} style={{ color: '#666' }}>
              <span>Account</span>
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

const renderMenuItem = (item: any, dom: React.ReactNode) => <Link to={item.path || '/'}>{dom}</Link>;

const subMenuItemRender = (item: any, dom: React.ReactNode) => <Link to={item.path || '/'}>{dom}</Link>;

interface ICustomLayoutProps {
  children: ReactNode;
}

const CustomLayout = ({ children }: ICustomLayoutProps) => {
  const location = useLocation();

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      setScrollPercent(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ProLayout
      logo={logo}
      title="TechStore"
      style={{ minHeight: '100vh' }}
      fixSiderbar
      location={location}
      menu={{
        request: async () => loopMenuItem(defaultMenus),
      }}
      route={{ routes: defaultMenus }}
      menuItemRender={renderMenuItem}
      subMenuItemRender={subMenuItemRender}
      // eslint-disable-next-line
      menuFooterRender={(props) => <CustomFooterMenu {...props} />}
      headerContentRender={() => null} // Remove the default header content
    >
      <Affix offsetTop={0}>
        <div style={{ position: 'relative', zIndex: 1000 }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 4,
              width: `${scrollPercent}%`,
              background: '#1890ff',
              transition: 'width 0.1s ease-out',
              zIndex: 9999,
            }}
          />
          <SearchBar />
        </div>
      </Affix>
      <div style={{ background: '#f5f5f5', minHeight: 'calc(100vh - 120px)' }}>
        {children}
      </div>
    </ProLayout>
  );
};

export { CustomLayout };
