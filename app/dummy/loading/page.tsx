'use client';

import LoadIcon from '@/app/components/icons/LoadIcon';
import Loading from '@/app/components/Loading';

export default function LoadingPage() {
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>LoadIcon 사용</th>
            <th>Loading 사용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <LoadIcon />
            </td>
            <td>
              <Loading text="가져오는 중..." />
            </td>
          </tr>
        </tbody>
      </table>

      <style jsx>{`
        table th,
        table td {
          border: 1px solid var(--b-tertiary);
          padding: 8px;
        }
      `}</style>
    </div>
  );
}
