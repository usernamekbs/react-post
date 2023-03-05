import React from 'react';
import { Button, Result } from 'antd';

const NotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="해당 페이지를 찾을 수 없습니다."
            extra={<Button type="primary">홈으로 이동하기</Button>}
      />
    );
};

export default NotFound;