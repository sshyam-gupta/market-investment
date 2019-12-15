import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Layout from '../components/Layout';
import _ from 'lodash';
// @ts-ignore
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

const TABLE_HEAD = [
  'Head',
  'Head2',
  'Head3',
  'Head4',
  'Head5',
  'Head6',
  'Head7',
  'Head8',
  'Head9',
];
const DATA = [40, 60, 80, 100, 120, 140, 160, 180, 200];

class ReportsScreen extends React.Component {
  static navigationOptions = {
    title: 'Reports',
  };

  render() {
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

    return (
      <Layout>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={TABLE_HEAD}
                widthArr={DATA}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={DATA}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: '#F7F6E7' },
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
});

export default ReportsScreen;
