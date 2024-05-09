// import { FC } from "react";
// import { Form } from "react-bootstrap";
// import styles from "./MultiSelect.module.css";

// interface MultiSelectProps {
//   items: any,
//   handleSelect:
// }

// const MultiSelect: FC = () => {
//   return (
//     <Form.Group className={styles.input} controlId="department">
//       <Form.Label>Группа</Form.Label>

//       {/* Здесь идет множественный выбор элементов */}
//       <Form.Select
//         onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectUsersGroup(e)}
//         aria-label="Выберите группу"
//       >
//         <option>Список групп</option>
//         {notSelectedUsersGroups &&
//           notSelectedUsersGroups.map((group) => (
//             <option key={group.id} value={group.id}>
//               {group.name}
//             </option>
//           ))}
//       </Form.Select>

//       {/* Выбранные элементы */}
//       <div className={styles.selectedGroups}>
//         {selectedUsersGroups &&
//           selectedUsersGroups.map((group) => (
//             <Button
//               onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUnselectUsersGroup(e)}
//               key={group.id}
//               variant="outline-dark"
//               data-value={group.id}
//             >
//               {group.name}{" "}
//               <Badge style={{ backgroundColor: "inherit" }} bg="light">
//                 <img className={styles.closeImg} src={closeImg} alt="closeImg" />
//               </Badge>
//             </Button>
//           ))}
//       </div>
//     </Form.Group>
//   );
// };

// export default MultiSelect;
