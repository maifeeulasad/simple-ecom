import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  Space,
  Pagination,
  Select,
  Checkbox,
  Slider,
  Divider,
  Rate,
  Tag,
  Image,
  Breadcrumb,
} from 'antd';
import {
  ShoppingCartOutlined,
  SwapOutlined,
  HomeOutlined,
  LaptopOutlined,
  FilterOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const laptopData = [
  {
    id: 1,
    name: 'ASUS Vivobook 15 X1504VA Core i3 13th Gen 15.6" FHD Laptop',
    brand: 'ASUS',
    processor: 'Intel Core i3-1315U (10M Cache, up to 4.50 GHz)',
    ram: '8GB DDR4',
    storage: '512GB Gen3 SSD',
    display: '15.6" FHD (1920X1080), 60Hz, 250nits Brightness',
    features: 'Chiclet Keyboard, Privacy Shutter, SonicMaster',
    price: 57500,
    originalPrice: 60000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    discount: '2,500৳ Discount on Checkout',
  },
  {
    id: 2,
    name: 'ASUS ExpertBook B1 B1503CVA Core i5 13th Gen 15.6" FHD Laptop',
    brand: 'ASUS',
    processor: 'Intel Core i5-1335U (10C, Up to 4.6GHZ, 12MB Cache)',
    ram: '8GB DDR5',
    storage: '512GB Gen4 SSD',
    display: '15.6", FHD (1920 x 1080) 16:9, Anti-glare display',
    features: 'Wi-Fi 6, Military Grade',
    price: 81000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    discount: null,
  },
  {
    id: 3,
    name: 'ASUS Vivobook Go 15 L510KA Celeron N4500 15.6" FHD Laptop Star Black',
    brand: 'ASUS',
    processor: 'Intel Celeron N4500 (4MB Cache, up to 2.8 GHz)',
    ram: '8GB DDR4',
    storage: '256GB M.2 NVMe PCIe 3.0 SSD',
    display: '15.6" Full HD (1920 x 1080) 250 nits',
    features: 'Type-C, Privacy Shutter, Wi-Fi 5',
    price: 36800,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=200&fit=crop',
    rating: 4.2,
    reviews: 156,
    inStock: true,
    discount: null,
  },
  {
    id: 4,
    name: 'ASUS Vivobook Go 15 E1504GA Core i3 N305 15.6" FHD Laptop',
    brand: 'ASUS',
    processor: 'Intel Core i3-N305 (6MB Cache, up to3.8 GHz)',
    ram: '8GB DDR4',
    storage: '256GB M.2 NVMe PCIe 3.0 SSD',
    display: '15.6" Full HD (1920 x 1080) 250 nits',
    features: 'Backlit Keyboard, Type-C, Privacy Shutter, Wi-Fi 6E',
    price: 49000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop',
    rating: 4.4,
    reviews: 203,
    inStock: true,
    discount: null,
  },
  {
    id: 5,
    name: 'ASUS VivoBook 15 X515EA Core i3 11th Gen 512GB SSD 15.6" FHD Laptop',
    brand: 'ASUS',
    processor: 'Intel Core i3-1115G4 (6M Cache, 3.00 GHz up to 4.10 GHz)',
    ram: '4GB DDR4 RAM (Onboard)',
    storage: '512GB SSD',
    display: '15.6" FHD (1920X1080)',
    features: 'Backlit Keyboard, Type-C',
    price: 55000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300&h=200&fit=crop',
    rating: 4.3,
    reviews: 174,
    inStock: false,
    discount: null,
  },
  {
    id: 6,
    name: 'ASUS Vivobook Go 15 L1504FA Ryzen 5 7520U 15.6" FHD Laptop',
    brand: 'ASUS',
    processor: 'AMD Ryzen 5 7520U (6MB Cache, Up to 4.3 GHz)',
    ram: '8GB LPDDR5',
    storage: '512GB SSD',
    display: '15.6" FHD (1920x1080)',
    features: 'Privacy Shutter, Type-C, Wi-Fi 6E',
    price: 59500,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&h=200&fit=crop',
    rating: 4.6,
    reviews: 92,
    inStock: true,
    discount: null,
  },
];

const brands = ['ASUS', 'HP', 'Dell', 'Lenovo', 'Acer', 'MSI'];
const processors = ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7'];

const LaptopCard: React.FC<{ laptop: typeof laptopData[0] }> = ({ laptop }) => (
  <Card
    hoverable
    style={{
      marginBottom: 24,
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #f0f0f0',
    }}
    bodyStyle={{ padding: 16 }}
  >
    <Row gutter={16}>
      <Col xs={24} sm={8} md={6}>
        <div style={{ position: 'relative' }}>
          <Image
            src={laptop.image}
            alt={laptop.name}
            style={{
              width: '100%',
              height: 160,
              objectFit: 'cover',
              borderRadius: 6,
            }}
            preview={false}
          />
          {laptop.discount && (
            <Tag
              color="red"
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                fontSize: 10,
                padding: '2px 6px',
              }}
            >
              SAVE
            </Tag>
          )}
          {!laptop.inStock && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
              }}
            >
              <Text strong style={{ color: 'white' }}>
                OUT OF STOCK
              </Text>
            </div>
          )}
        </div>
      </Col>
      <Col xs={24} sm={16} md={18}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Title level={5} style={{ margin: '0 0 8px 0', color: '#1890ff' }}>
            {laptop.name}
          </Title>
          
          <div style={{ marginBottom: 12 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              • Processor: {laptop.processor}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              • RAM: {laptop.ram}, Storage: {laptop.storage}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              • Display: {laptop.display}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              • Features: {laptop.features}
            </Text>
          </div>

          <div style={{ marginBottom: 8 }}>
            <Rate disabled defaultValue={laptop.rating} style={{ fontSize: 14 }} />
            <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
              ({laptop.reviews} reviews)
            </Text>
          </div>

          {laptop.discount && (
            <Text style={{ color: '#ff4d4f', fontSize: 12, marginBottom: 8 }}>
              {laptop.discount}
            </Text>
          )}

          <div style={{ marginTop: 'auto' }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Space>
                  {laptop.originalPrice && (
                    <Text delete type="secondary" style={{ fontSize: 14 }}>
                      {laptop.originalPrice.toLocaleString()}৳
                    </Text>
                  )}
                  <Text strong style={{ fontSize: 18, color: '#1890ff' }}>
                    {laptop.price.toLocaleString()}৳
                  </Text>
                </Space>
              </Col>
              <Col>
                <Space>
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    disabled={!laptop.inStock}
                    style={{
                      backgroundColor: '#ff4d4f',
                      borderColor: '#ff4d4f',
                      borderRadius: 4,
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button
                    icon={<SwapOutlined />}
                    style={{ borderRadius: 4 }}
                  >
                    Add to Compare
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  </Card>
);

const Landing: React.FC = () => {
  const [filteredLaptops, setFilteredLaptops] = useState(laptopData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [priceRange, setPriceRange] = useState<[number, number]>([25000, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);

  const handleBrandChange = (checkedValues: string[]) => {
    setSelectedBrands(checkedValues);
    filterLaptops(checkedValues, selectedProcessors, priceRange);
  };

  const handleProcessorChange = (checkedValues: string[]) => {
    setSelectedProcessors(checkedValues);
    filterLaptops(selectedBrands, checkedValues, priceRange);
  };

  const handlePriceChange = (value: number | number[]) => {
    const priceValue = Array.isArray(value) ? value as [number, number] : [value, value] as [number, number];
    setPriceRange(priceValue);
    filterLaptops(selectedBrands, selectedProcessors, priceValue);
  };

  const filterLaptops = (brands: string[], processors: string[], price: [number, number]) => {
    let filtered = laptopData;

    if (brands.length > 0) {
      filtered = filtered.filter(laptop => brands.includes(laptop.brand));
    }

    if (processors.length > 0) {
      filtered = filtered.filter(laptop => 
        processors.some(proc => laptop.processor.includes(proc))
      );
    }

    filtered = filtered.filter(laptop => 
      laptop.price >= price[0] && laptop.price <= price[1]
    );

    setFilteredLaptops(filtered);
    setCurrentPage(1);
  };

  const paginatedLaptops = filteredLaptops.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 120px)' }}>
      <Row gutter={24}>
        {/* Sidebar Filters */}
        <Col xs={24} sm={24} md={6} lg={5}>
          <Card
            style={{
              marginBottom: 24,
              borderRadius: 8,
              position: 'sticky',
              top: 80,
            }}
            bodyStyle={{ padding: 24 }}
          >
            <Title level={4} style={{ marginBottom: 24 }}>
              <FilterOutlined /> Filters
            </Title>

            <Divider />

            <div style={{ marginBottom: 24 }}>
              <Title level={5}>Price Range</Title>
              <Slider
                range
                min={25000}
                max={100000}
                step={1000}
                value={priceRange}
                onChange={handlePriceChange}
                tooltip={{
                  formatter: (value) => `${value?.toLocaleString()}৳`
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#666' }}>
                <span>{priceRange[0].toLocaleString()}৳</span>
                <span>{priceRange[1].toLocaleString()}৳</span>
              </div>
            </div>

            <Divider />

            <div style={{ marginBottom: 24 }}>
              <Title level={5}>Brand</Title>
              <Checkbox.Group
                options={brands}
                value={selectedBrands}
                onChange={handleBrandChange}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              />
            </div>

            <Divider />

            <div style={{ marginBottom: 24 }}>
              <Title level={5}>Processor</Title>
              <Checkbox.Group
                options={processors}
                value={selectedProcessors}
                onChange={handleProcessorChange}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              />
            </div>
          </Card>
        </Col>

        {/* Main Content */}
        <Col xs={24} sm={24} md={18} lg={19}>
          <Card
            style={{
              borderRadius: 8,
              marginBottom: 24,
            }}
            bodyStyle={{ padding: 24 }}
          >
            {/* Breadcrumb */}
            <Breadcrumb style={{ marginBottom: 24 }}>
              <Breadcrumb.Item href="/">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/laptops">
                <LaptopOutlined />
                <span>Laptop</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>All Laptop</Breadcrumb.Item>
            </Breadcrumb>

            {/* Page Title */}
            <div style={{ marginBottom: 24 }}>
              <Title level={2} style={{ margin: 0 }}>
                Laptop Price in Bangladesh
              </Title>
              <Paragraph type="secondary">
                Laptop Price starts from BDT 25,500 to BDT 649,900 in Bangladesh, depending on
                Brand, Specifications, and Features. Buy original branded laptop from Simple Ecom
                Laptop shop in BD. Browse below and Order yours now!
              </Paragraph>
            </div>

            {/* Results Header */}
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
              <Col>
                <Text>
                  Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, filteredLaptops.length)} of {filteredLaptops.length} results
                </Text>
              </Col>
              <Col>
                <Space>
                  <Text>Sort by:</Text>
                  <Select defaultValue="price-low" style={{ width: 150 }}>
                    <Option value="price-low">Price: Low to High</Option>
                    <Option value="price-high">Price: High to Low</Option>
                    <Option value="rating">Rating</Option>
                    <Option value="name">Name</Option>
                  </Select>
                </Space>
              </Col>
            </Row>

            {/* Product Grid */}
            <div>
              {paginatedLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>

            {/* Pagination */}
            {filteredLaptops.length > pageSize && (
              <Row justify="center" style={{ marginTop: 32 }}>
                <Pagination
                  current={currentPage}
                  total={filteredLaptops.length}
                  pageSize={pageSize}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                />
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Landing;
