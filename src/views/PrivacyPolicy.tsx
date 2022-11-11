import { Spacer } from "../component/SwipeTabs"

export const PrivacyPolicy = (props: { width?: string, onClick?: () => void, appBarHeight?: number }) => {
  return (
    <div style={{ margin: "3vw auto" }}>
      <Spacer appBarHeight={props.appBarHeight || 56} mode={"history"} />
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "2vw",
          borderRadius: "8px",
          width: props.width ? props.width : "90%",
          margin: "0 auto",
        }}
      >
        <h1
          className="japanese_L"
          style={{
            textAlign: "center",
            color: "#707070",
            margin: props.width && "auto",
          }}
        >
          プライバシーポリシー
        </h1>
        <div
          style={{ width: props.width ? props.width : "80%", margin: "auto" }}
        >
          <p>
            当方は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
          </p>
          <h2>第1条（個人情報）</h2>
          <p>「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。</p>
          <h2>第2条（個人情報の収集方法）</h2>
          <p>当方は，ユーザーが利用登録をする際に氏名，メールアドレス，銀行口座番号，クレジットカード番号などの個人情報をお尋ねすることがあります。また，ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を,当方の提携先（情報提供元，広告主，広告配信先などを含みます。以下，｢提携先｣といいます。）などから収集することがあります。</p>
          <h2>第3条（個人情報を収集・利用する目的）</h2>
          <p>当方が個人情報を収集・利用する目的は，以下のとおりです。</p>
          <p>1.本サービスの提供・運営のため</p>
          <p>2.ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</p>
          <p>3.ユーザーが利用中のサービスの新機能，更新情報，キャンペーン等及び当方が提供する他のサービスの案内のメールを送付するため</p>
          <p>4. メンテナンス，重要なお知らせなど必要に応じたご連絡のため</p>
          <p>5.利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため</p>
          <p>6.ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため</p>
          <p>7. 上記の利用目的に付随する目的</p>
          <h2>第4条（利用目的の変更</h2>
          <p>1.当方は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。</p>
          <p>2.利用目的の変更を行った場合には，変更後の目的について，当方所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。</p>
          <h2>第5条（個人情報の第三者提供</h2>
          <p>1.当方は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。</p>
          <div style={{ padding: "0 5%" }}>
            <p>一. 人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき</p>
            <p>二. 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき</p>
            <p>三. 国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</p>
            <p>四. 予め次の事項を告知あるいは公表し，かつ当方が個人情報保護委員会に届出をしたとき</p>
            <div style={{ padding: "0 5%" }}>
              <p>イ. 利用目的に第三者への提供を含むこと </p>
              <p>ロ. 第三者に提供されるデータの項目 </p>
              <p>ハ. 第三者への提供の手段または方法 </p>
              <p>ニ. 本人の求めに応じて個人情報の第三者への提供を停止すること </p>
              <p>ホ. 本人の求めを受け付ける方法 </p>
            </div>
          </div>
          <p>2.前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。</p>
          <div style={{ padding: "0 5%" }}>
            <p>一.当方が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</p>
            <p>二.合併その他の事由による事業の承継に伴って個人情報が提供される場合 </p>
            <p>三.個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合</p>
          </div>
          <h2>第6条（個人情報の開示） </h2>
          <p>1.当方は，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。</p>
          <div style={{ padding: "0 5%" }}>
            <p>一.本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合</p>
            <p>二. 当方の業務の適正な実施に著しい支障を及ぼすおそれがある場合 </p>
            <p>三.その他法令に違反することとなる場合 </p>
          </div>
          <p>2.前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。</p>
          <h2>第7条（個人情報の訂正および削除） </h2>
          <p>1.ユーザーは，当方の保有する自己の個人情報が誤った情報である場合には，当方が定める手続きにより，当方に対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。</p>
          <p>2.当方は，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。</p>
          <p>3.当方は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。</p>
          <h2>第8条（個人情報の利用停止等） </h2>
          <p>1.当方は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。</p>
          <p>2.前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。</p>
          <p>3.当方は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。</p>
          <p>4.前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。</p>
          <h2>第9条（プライバシーポリシーの変更） </h2>
          <p>1.本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。</p>
          <p>2.当方が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。</p>
          <h2>第10条（お問い合わせ窓口）</h2>
          <p></p>
          <p>本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。</p>
          <p style={{ textAlign: "center" }}>メールアドレス<br />runticket21@gmail.com </p>
          <p style={{ textAlign: "right" }}>以上</p>
        </div>
        {props.onClick && <div className="japanese_L over" style={{ textAlign: "center" }} onClick={props.onClick}>利用規約に戻る</div>}
      </div>
    </div>
  );
};
