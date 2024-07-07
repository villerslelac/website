import { readItems } from '@directus/sdk';
import { MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import clsx from 'clsx';

import { ContentBlock, Headband } from 'app/components';
import { CouncilMembers } from 'app/types/council_member';
import directus from 'app/utils/directus';
import { useRootContext } from 'app/utils/useRootContext';

import styles from './index.module.scss';

const getCouncilMembers = async () => {
  try {
    const members = await directus.request(readItems('council_member'));
    return members;
  } catch (error) {
    return [];
  }
};

export const loader = async () => {
  const members = (await getCouncilMembers()) as CouncilMembers;

  return json({ members });
};

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  return [...parentMeta, { title: 'Équipe municipale' }];
};

const TownCouncil = () => {
  const { members } = useLoaderData<typeof loader>();

  const groupMembers: { [key: string]: CouncilMembers } = members.reduce(
    (groups, member) => {
      let group = member.group as string;
      if (group === 'DELEGATE') {
        group = 'DEPUTY';
      }
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(member);
      return groups;
    },
    {} as { [key: string]: CouncilMembers },
  );

  return (
    <>
      <Headband
        title="Équipe municipale"
        breadcrumb={[
          { link: '/votre-mairie', label: 'Votre mairie' },
          {
            link: '/votre-mairie/equipe-municipale',
            label: 'Équipe municipale',
          },
        ]}
      />
      <main className={styles.main}>
        {groupMembers['MAYOR'] ? (
          <MembersSection title="Maire" members={groupMembers['MAYOR']} />
        ) : null}
        {groupMembers['DEPUTY'] ? (
          <MembersSection
            title="Adjoints et délégués"
            members={groupMembers['DEPUTY']}
          />
        ) : null}
        {groupMembers['COUNCILOR'] ? (
          <MembersSection
            title="Conseillers municipaux"
            members={groupMembers['COUNCILOR']}
            size="sm"
          />
        ) : null}
      </main>
    </>
  );
};

interface MembersSectionProps {
  title: string;
  members: CouncilMembers;
  size?: 'sm';
}

const MembersSection: React.FC<MembersSectionProps> = ({
  title,
  members,
  size,
}) => {
  const { directusUrl } = useRootContext();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={clsx(styles.members, size == 'sm' && styles.membersSmall)}>
        {members.map((member) => (
          <li className={styles.member} key={member.id}>
            {member.profile_picture ? (
              <img
                className={styles.memberImage}
                src={`${directusUrl}/assets/${member.profile_picture}?key=council-member`}
                alt={`${member.firstname} ${member.lastname}`}
              />
            ) : (
              <img
                className={styles.memberImage}
                src="/default-council-member.png"
                alt={`${member.firstname} ${member.lastname}`}
              />
            )}
            <h3 className={styles.memberName}>
              {member.firstname} {member.lastname}
            </h3>
            <ContentBlock
              className={styles.memberPosition}
              html={member.position}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TownCouncil;
