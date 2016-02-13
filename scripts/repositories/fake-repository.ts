'use strict'
{
  const data = [
    { 'ID': '11111111-1111-1111-1111-111111111111', 'Name': 'A', 'Path': '11111111-1111-1111-1111-111111111111', Parent: ''},
    { 'ID': 'AA', 'Name': 'AA', 'Path': '11111111-1111-1111-1111-111111111111/AA', Parent: '11111111-1111-1111-1111-111111111111' },
    { 'ID': 'AAA', 'Name': 'AAA', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAA', Parent: 'AA' },
    { 'ID': 'AAAA', 'Name': 'AAAA', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAA/AAAA', Parent: 'AAA' },
    { 'ID': 'AAAB', 'Name': 'AAAB', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAA/AAAB', Parent: 'AAA' },
    { 'ID': 'AAAC', 'Name': 'AAAC', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAA/AAAC', Parent: 'AAA' },
    { 'ID': 'AAB', 'Name': 'AAB', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAB', Parent: 'AA' },
    { 'ID': 'AABA', 'Name': 'AABA', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAB/AABA', Parent: 'AAB' },
    { 'ID': 'AABB', 'Name': 'AABB', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAB/AABB', Parent: 'AAB' },
    { 'ID': 'AABC', 'Name': 'AABC', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAB/AABC', Parent: 'AAB' },
    { 'ID': 'AAC', 'Name': 'AAC', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAC', Parent: 'AA' },
    { 'ID': 'AACA', 'Name': 'AACA', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAC/AACA', Parent: 'AAC' },
    { 'ID': 'AACB', 'Name': 'AACB', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAC/AACB', Parent: 'AAC' },
    { 'ID': 'AACC', 'Name': 'AACC', 'Path': '11111111-1111-1111-1111-111111111111/AA/AAC/AACC', Parent: 'AAC' },
    { 'ID': 'AB', 'Name': 'AB', 'Path': '11111111-1111-1111-1111-111111111111/AB', Parent: '11111111-1111-1111-1111-111111111111' },
    { 'ID': 'ABA', 'Name': 'ABA', 'Path': '11111111-1111-1111-1111-111111111111/AB/ABA', Parent: 'AB' },
    { 'ID': 'ABB', 'Name': 'ABB', 'Path': '11111111-1111-1111-1111-111111111111/AB/ABB', Parent: 'AB' },
    { 'ID': 'ABC', 'Name': 'ABC', 'Path': '11111111-1111-1111-1111-111111111111/AB/ABC', Parent: 'AB' },
    { 'ID': 'AC', 'Name': 'AC', 'Path': '11111111-1111-1111-1111-111111111111/AC', Parent: '11111111-1111-1111-1111-111111111111' },
    { 'ID': 'ACA', 'Name': 'ACA', 'Path': '11111111-1111-1111-1111-111111111111/AC/ACA', Parent: 'AC' },
    { 'ID': 'ACB', 'Name': 'ACB', 'Path': '11111111-1111-1111-1111-111111111111/AC/ACB', Parent: 'AC' },
    { 'ID': 'ACC', 'Name': 'ACC', 'Path': '11111111-1111-1111-1111-111111111111/AC/ACC', Parent: 'AC' }]

  const getChildren = (itemId) => {
    return new Promise(
      resolve => {
        resolve(data.filter((value) => value.Parent === itemId))
      }
    )
  }

  module.exports = {
    getChildren
  }
}