import ByteInput from 'components/ByteInput';
import React from 'react';
import { reportCardMap } from 'services/mvTables';

export default function ReportCard(){

  return <table>
    <tbody>
      {
        reportCardMap.map(i =>
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