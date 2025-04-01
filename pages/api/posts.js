export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbz4FJIbm45mQDLpSjSpkuQK210KNGWQWtH5t_-iwrPKvmOphMUGGPhQTxcdCDNhIawI/exec'
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    if (data.status === 'success') {
      // 데이터 형식을 카드 표시에 맞게 변환
      const formattedData = {
        status: 'success',
        data: data.data.map((item, index) => ({
          id: index + 1,
          title: item.prompt,
          description: item.result,
          category: item.category,
          date: new Date(item.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).replace(/\. /g, '.').replace('.', ''),
          emoji: item.emoji,
          total: item.total,
          source: item.source,
          author: {
            name: 'AI Writer',
            image: '/images/ai-writer.png'
          }
        }))
      };
      
      return res.status(200).json(formattedData);
    }
    
    return res.status(500).json({ message: 'Failed to fetch data' });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 