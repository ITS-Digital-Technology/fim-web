'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from './page.module.scss';
import { getGreeting } from '@/utils/time';
import { ProfilePicture } from '@/common/profilePicture/ProfilePicture';
import MyProfile from '../components/common/myProfile/MyProfile';
import { MockUser } from '../mocks/User';
import MyEmployment from '../components/common/myEmployment/MyEmployment';
import MyBasics from '../components/common/myBasics/MyBasics';
import MePageWelcome from '../components/common/welcomePage/MePageWelcome';

export default function Home() {
    const user = MockUser;
    const rowToFixup = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onOrientationChange = () => {
            if (!rowToFixup.current) {
                return;
            }

            rowToFixup.current.style.display = 'block';
            setTimeout(() => {
                if (rowToFixup.current) {
                    rowToFixup.current.style.display = 'flex';
                }
            }, 100);
        };

        window.addEventListener('orientationchange', onOrientationChange);
        return () => {
            window.removeEventListener('orientationchange', onOrientationChange);
        };
    }, [rowToFixup]);

    const [expandedOption, setExpandedOption] = useState<string | null>(null);
    const [selectedChild, setSelectedChild] = useState<string | null>(null);

    const toggleExpand = (option: string) => {
        setExpandedOption(expandedOption === option ? null : option);
        setSelectedChild(null);
    };

    const renderContent = () => {
        if (selectedChild === 'userinfo') {
            return <MyBasics />;
        }
        if (selectedChild === 'employment') {
            return <MyEmployment />;
        }
        if (expandedOption === 'profile') {
            return <MyProfile />;
        }

        // 默认内容：未选择任何选项时显示
        return (
            <div className={styles.defaultContent}>
                <img
                    src="/default-image.png"
                    alt="Welcome"
                    className={styles.defaultImage}
                />
                <p>Welcome to the profile page! Please select an option to view details.</p>
            </div>
        );
    };

    return (
        <div className={styles.main}>
            <div className={styles.profileAndNav}>
                <div className={styles.profile}>
                    <ProfilePicture />
                    <p className={styles.text}>Click on the image above to change your profile picture.</p>
                </div>
                <div>
                    <div className={styles.studentGreeting}>
                        <div>
                            {getGreeting(user?.campusName)}
                            {user && ','}
                        </div>
                        <b className={styles.studentName}>
                            {user?.firstName?.toUpperCase() ?? ''}
                        </b>
                    </div>
                    <div>
                        <button onClick={() => toggleExpand('userinfo')}>
                            General Information {expandedOption === 'userinfo' ? '▲' : '▼'}
                        </button>
                        {expandedOption === 'userinfo' && (
                            <div className={styles.subOptions}>
                                <button onClick={() => setSelectedChild('userinfo')}>My Basics</button>
                                <button onClick={() => setSelectedChild('employment')}>My Employment</button>
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={() => toggleExpand('profile')}>My Profile</button>
                    </div>
                </div>
            </div>

            <div className={styles.contentWrapper}>
                {renderContent()}
            </div>
        </div>
    );
}
