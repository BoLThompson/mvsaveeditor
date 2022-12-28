import ByteInput from 'components/ByteInput';
import React from 'react';
import { inventoryMap } from 'services/mvTables';

export default function InventoryPane() {

  return <table>
    <tbody>
      {
        inventoryMap.map(i =>
          <tr
            key={i.addr}
          >
            <td>
              {i.name}
            </td>
            <td>
              <ByteInput
                addr={i.addr}
                byteWidth={2}
                display="dec"
              />
            </td>
          </tr>  
        )
      }
    </tbody>
  </table>
}