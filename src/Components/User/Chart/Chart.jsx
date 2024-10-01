// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';

// const data = [
//   { name: 'Income', value: 27200 },
//   { name: 'Expenses', value: 19900 },
// ];

// const COLORS = ['#4CAF50', '#FFA726'];

// const savingsGoal = 10000;
// const currentSavings = 6000;

// const Chart = () => {
//   const savingsProgress = (currentSavings / savingsGoal) * 100;

//   return (
//     <div className="space-y-4">
//       <Card>
//         <CardHeader>Income vs. Expenses</CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>Savings Goal Progress</CardHeader>
//         <CardContent>
//           <Progress value={savingsProgress} className="w-full" />
//           <p className="mt-2 text-center">
//             ${currentSavings.toLocaleString()} / ${savingsGoal.toLocaleString()} ({savingsProgress.toFixed(1)}%)
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Chart;