// import { LucideBot } from '@/components/icons/CallLogs.icons';
// import styles from './CreateCampaignForm.module.scss';
// import { CreateCampaignRequest } from '../campaign.type';
// import { LuPhone } from 'react-icons/lu';
// import { Badge } from '@/components/ui/Badge/Badge';
// import { IoIosCheckmark } from 'react-icons/io';

// interface Props {
//   formData: CreateCampaignRequest;
//   updateFormData: (updates: Partial<CreateCampaignRequest>) => void;
// }

// // const AI_ASSISTANTS = [
// //   {
// //     id: '1',
// //     name: 'Agent 1',
// //     model: 'gpt-4o',
// //   },
// //   {
// //     id: '2',
// //     name: 'Agent 2',
// //     model: 'gpt-4o',
// //   },
// //   {
// //     id: '3',
// //     name: 'Agent 3',
// //     model: 'gpt-4o',
// //   },
// // ];

// const PHONE_NUMBERS = [
//   {
//     id: '1',
//     number: '+15551234567',
//     label: 'Phone Number 1',
//     status: 'active',
//   },
//   {
//     id: '2',
//     number: '+15551234568',
//     label: 'Phone Number 2',
//     status: 'inactive',
//   },
//   {
//     id: '3',
//     number: '+15551234569',
//     label: 'Phone Number 3',
//     status: 'active',
//   },
// ];

// function Step2LeadsResources({ formData, updateFormData }: Props) {
//   return (
//     <div className={styles.stepContent}>
//       <div className={styles.stepContent}>
//         {/* AI Assistant Section */}
//         <div className={styles.section}>
//           <div className={styles.sectionHeader}>
//             <div className={styles.sectionIcon}>
//               <LucideBot />
//             </div>
//             <div>
//               <h3 className={styles.sectionTitle}>
//                 AI Assistant that will place the calls
//               </h3>
//               <p className={styles.sectionSubtitle}>
//                 Select the AI assistant that will handle the conversations
//               </p>
//             </div>
//           </div>
//           <div className={styles.cardGrid}>
//             {/* {AI_ASSISTANTS.map((assistant: any) => (
//               <button
//                 key={assistant.id}
//                 className={`${styles.selectionCard} ${formData.ai_assistant_id === assistant.id ? styles.selected : ''}`}
//                 onClick={() =>
//                   updateFormData({
//                     ai_assistant_id: assistant.id,
//                     ai_assistant_name: assistant.name,
//                   })
//                 }
//               >
//                 <div className={styles.cardContent}>
//                   <span className={styles.cardTitle}>{assistant.name}</span>
//                   <span className={styles.cardMeta}>{assistant.model}</span>
//                 </div>
//                 {formData.ai_assistant_id === assistant.id && (
//                   <div className={styles.checkMark}>
//                     <IoIosCheckmark />
//                   </div>
//                 )}
//               </button>
//             ))} */}
//           </div>
//         </div>

//         {/* Phone Number Section */}
//         <div className={styles.section}>
//           <div className={styles.sectionHeader}>
//             <div className={styles.sectionIcon}>
//               <LuPhone />
//             </div>
//             <div>
//               <h3 className={styles.sectionTitle}>
//                 Phone number that will make the calls
//               </h3>
//               <p className={styles.sectionSubtitle}>
//                 Select the phone number that will be used for outbound calls
//               </p>
//             </div>
//           </div>
//           <div className={styles.cardGrid}>
//             {PHONE_NUMBERS.map((phone) => (
//               <button
//                 key={phone.id}
//                 className={`${styles.selectionCard} ${styles.phoneCard} ${formData.phone_number === phone.number ? styles.selected : ''}`}
//                 onClick={() => updateFormData({ phone_number: phone.number })}
//               >
//                 <div className={styles.cardContent}>
//                   <span className={styles.cardTitle}>{phone.label}</span>
//                   <div className={styles.phoneInfo}>
//                     <span className={styles.phoneNumber}>{phone.number}</span>
//                     <Badge
//                       variant={
//                         phone.status === 'active' ? 'success' : 'default'
//                       }
//                     >
//                       {phone.status === 'active' ? 'Active' : 'Inactive'}
//                     </Badge>
//                   </div>
//                 </div>
//                 {formData.phone_number === phone.number && (
//                   <div className={styles.checkMark}>
//                     <IoIosCheckmark />
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Step2LeadsResources;
