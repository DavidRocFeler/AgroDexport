import type { NextPage } from "next";
import styles from "../styles/ChatBot.module.css";

const ChatBot: NextPage = () => {
  return (
    <div className={styles.previewPane}>
      <div className={styles.chatContainer}>
        <div className={styles.header}>
          <div className={styles.header1} />
          <div className={styles.editHeaderContent}>
            <div className={styles.logoParent}>
              <img
                className={styles.logoIcon}
                alt=""
                src="../WappGPT - logo.svg"
              />
              <div className={styles.leftSide}>
                <div className={styles.brandName}>
                  <b className={styles.starklyai}>ChatBot</b>
                </div>
                <div className={styles.status}>
                  <div className={styles.online}>Online</div>
                  <div className={styles.statusChild} />
                </div>
              </div>
            </div>
            <img
              className={styles.icons}
              alt=""
              src="/minus-cirlce_chatbot.svg"
            />
          </div>
        </div>
        <div className={styles.transcript}>
          <div className={styles.systemMessage}>
            <div className={styles.bubbleSender}>
              <div className={styles.messages}>
                <div className={styles.helloSystemMessageContainer}>
                  <p className={styles.rapidlyBuildStunning}>
                    Lorem ipsum asdas dasda da dadadd adasdd. Lorem ipsum asdas
                    dasda da dadadd adasdd. Lorem ipsum asdas.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.userMessage}>
            <div className={styles.bubbleSender1}>
              <div className={styles.messages}>
                <div
                  className={styles.helloSystemMessageContainer}
                >{`Lorem ipsum asdas dasda da dadadd adasdd. Lorem ipsum  `}</div>
              </div>
            </div>

            <img className={styles.checkIcon1} alt="" src="check.png" />
            <img
              className={styles.avatars48x48}
              alt=""
              src="../avatar_chatbot.png"
            />
          </div>

          <div className={styles.systemMessage}>
            <div className={styles.bubbleSender}>
              <div className={styles.messages}>
                <div className={styles.helloSystemMessageContainer}>
                  <p className={styles.rapidlyBuildStunning}>
                    Lorem ipsum asdas dasda da dadadd adasdd. Lorem ipsum asdas
                    dasda da dadadd adasdd. Lorem ipsum asdas.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 w-12 h-12 bg-black rounded-full"></div>
              <img
                className="relative z-10 translate-y-2 translate-x-1 "
                alt=""
                src="../logo_chatbot.svg"
              />
            </div>
          </div>
          <div className={styles.userMessage}>
            <div className={styles.bubbleSender1}>
              <div className={styles.messages}>
                <div className={styles.helloSystemMessageContainer}>
                  Lorem ipsum asdas dasda da dadadd adasdd. Lorem ipsum asdas
                  dasda da dadadd adasdd. Lorem ipsum asdas.
                </div>
              </div>
            </div>

            <img className={styles.checkIcon1} alt="" src="check.png" />
            <img
              className={styles.avatars48x48}
              alt=""
              src="../avatar_chatbot.png"
            />
          </div>
        </div>
        <div className={styles.footer4}>
          <div className={styles.textArea}>
            <div className={styles.typeYourMessage}>
              Type your message here...
            </div>
            <img className={styles.icons} alt="" src="../send_chatbot.svg" />
          </div>
        </div>
        <div className={styles.shadow} />
      </div>
    </div>
  );
};

export default ChatBot;
