import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import dummySellingHistory from '../../dummySellingHistory';
import { Picker } from "@react-native-picker/picker";
import { styles } from './StatisticsScreenStyles';

const StatisticsScreen = () => {
  const [filter, setFilter] = useState('1year');
  const [customYear, setCustomYear] = useState(new Date().getFullYear().toString());
  const [filteredSalesData, setFilteredSalesData] = useState([]);

  const handleFilterChange = (itemValue) => {
    setFilter(itemValue);
    if (itemValue !== 'custom') {
      setCustomYear(new Date().getFullYear().toString());
    }
  };

  const handleCustomYearChange = (newYear) => {
    setCustomYear(newYear);
  };

  useEffect(() => {
    const filterSalesData = () => {
      switch (filter) {
        case '1year':
          return filterByLastNYears(1);
        case '2years':
          return filterByLastNYears(2);
        case '5years':
          return filterByLastNYears(5);
        case '10years':
          return filterByLastNYears(10);
        case 'custom':
          if (customYear) {
            const year = parseInt(customYear, 10);
            return filterByCustomYear(year);
          }
          break;
        default:
          return dummySellingHistory;
      }
    };

    const filterByLastNYears = (years) => {
      const cutoffDate = new Date(new Date().getFullYear() - years, 0, 1).getTime();
      return dummySellingHistory.map(item => {
        const filteredTransactions = item.transactions.filter(transaction => transaction.soldDate > cutoffDate);
        return { ...item, transactions: filteredTransactions };
      }).filter(item => item.transactions.length > 0);
    };

    const filterByCustomYear = (year) => {
      const startDate = new Date(year, 0, 1).getTime();
      const endDate = new Date(year, 11, 31, 23, 59, 59).getTime();
      return dummySellingHistory.map(item => {
        const filteredTransactions = item.transactions.filter(transaction => {
          const transactionDate = new Date(transaction.soldDate).getTime();
          return transactionDate >= startDate && transactionDate <= endDate;
        });
        return { ...item, transactions: filteredTransactions };
      }).filter(item => item.transactions.length > 0);
    };

    const filteredData = filterSalesData();
    setFilteredSalesData(filteredData || []);
  }, [filter, customYear]);

  const getYearlyData = (yearsCount) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: yearsCount }, (_, index) => currentYear - yearsCount + 1 + index);
    const data = years.map(year => {
      let totalQuantity = 0;
      let totalAmount = 0;

      filteredSalesData.forEach(item => {
        item.transactions.forEach(transaction => {
          if (new Date(transaction.soldDate).getFullYear() === year) {
            totalQuantity += transaction.quantity;
            totalAmount += transaction.amount;
          }
        });
      });

      return { year, totalQuantity, totalAmount };
    });

    return data;
  };

  const getMonthlyData = () => {
    const year = parseInt(customYear, 10);
    const months = Array.from({ length: 12 }, (_, index) => new Date(year, index, 1).toLocaleString('default', { month: 'short' }));
    const data = months.map((month, index) => {
      let totalQuantity = 0;
      let totalAmount = 0;

      filteredSalesData.forEach(item => {
        item.transactions.forEach(transaction => {
          const transactionDate = new Date(transaction.soldDate);
          if (transactionDate.getFullYear() === year && transactionDate.getMonth() === index) {
            totalQuantity += transaction.quantity;
            totalAmount += transaction.amount;
          }
        });
      });

      return { month, totalQuantity, totalAmount };
    });

    return data;
  };

  const renderChart = () => {
    if (['1year', '2years', '5years', '10years'].includes(filter)) {
      const yearsCount = parseInt(filter.replace('years', ''), 10);
      const yearlyData = getYearlyData(yearsCount);

      const quantityData = yearlyData.map(d => ({ label: d.year.toString(), value: d.totalQuantity }));
      const amountData = yearlyData.map(d => ({ label: d.year.toString(), value: d.totalAmount }));

      return (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{`Sales Data for the Last ${yearsCount} Years`}</Text>
          <BarChart
            data={{
              labels: quantityData.map(d => d.label),
              datasets: [{ data: quantityData.map(d => d.value) }]
            }}
            width={350}
            height={220}
            yAxisLabel="Qty"
            chartConfig={chartConfig}
          />
          <BarChart
            data={{
              labels: amountData.map(d => d.label),
              datasets: [{ data: amountData.map(d => d.value) }]
            }}
            width={350}
            height={220}
            yAxisLabel="₹"
            chartConfig={chartConfig}
          />
        </View>
      );
    } else if (filter === 'custom') {
      const monthlyData = getMonthlyData();

      const quantityData = monthlyData.map(d => ({ label: d.month, value: d.totalQuantity }));
      const amountData = monthlyData.map(d => ({ label: d.month, value: d.totalAmount }));

      return (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{`Sales Data for ${customYear}`}</Text>
          <LineChart
            data={{
              labels: quantityData.map(d => d.label),
              datasets: [{ data: quantityData.map(d => d.value) }]
            }}
            width={350}
            height={220}
            yAxisLabel="Qty"
            chartConfig={chartConfig}
          />
          <LineChart
            data={{
              labels: amountData.map(d => d.label),
              datasets: [{ data: amountData.map(d => d.value) }]
            }}
            width={350}
            height={220}
            yAxisLabel="₹"
            chartConfig={chartConfig}
          />
        </View>
      );
    }
    return null;
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterSection}>
        <Text style={styles.label}>Filter:</Text>
        <Picker
          selectedValue={filter}
          style={styles.picker}
          onValueChange={(itemValue) => handleFilterChange(itemValue)}
        >
          <Picker.Item label="Last 1 year" value="1year" />
          <Picker.Item label="Last 2 years" value="2years" />
          <Picker.Item label="Last 5 years" value="5years" />
          <Picker.Item label="Last 10 years" value="10years" />
          <Picker.Item label="Custom Year" value="custom" />
        </Picker>
        {filter === 'custom' && (
          <TextInput
            style={styles.input}
            placeholder="Enter year (YYYY)"
            keyboardType="numeric"
            value={customYear}
            onChangeText={handleCustomYearChange}
            maxLength={4}
          />
        )}
      </View>
      {renderChart()}
    </View>
  );
};

export default StatisticsScreen;
