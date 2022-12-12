```mermaid
sequenceDiagram
    %%{init:{'theme':'forest'}}%%
    autonumber
    actor User
    participant client as RunTicketApp
    participant backend as RunTicketBackend
    participant payback as PaymentBackend
    participant payapp as PaymentApp
    participant kiosk as Kiosk端末
    participant mise as 店側端末
    backend->>backend: Websocket Server起動
    mise->>mise: Websocket Client起動
    User->>client: メニュー選択
    client->backend: 在庫確認
    backend-->client: &nbsp;
    client->>backend: 注文を送信
    Note left of backend: {orderId:"XXX",...}
    backend->>backend: 注文データの保持
    backend-->>client: 完了ステータス
     Note left of backend:status:not_paid
    client->>backend:決済リクエスト
    backend->>payback: 決済URLの作成
    payback-->>backend: 決済フォームのURLを返却
    backend-->>client: 決済フォームのURL
    client-->>User: 決済画面の提供
    User->>payapp: 支払い情報の入力
    payapp->>payback: 支払い情報の取得
    payback-->>payapp: &nbsp;
    payapp->>payback: 決済処理
    payback-->>payapp: &nbsp;
    payapp-->>client:RunTicketAppへリダイレクト
    client->>payback:決済ステータスの取得
    payback-->>client: &nbsp;
    client->>backend:在庫の更新
    backend-->>client: &nbsp;
    client->>client:Websocket Client起動
    client->>backend:完了ステータス
    Note left of backend:status:ordered
    backend->>mise:注文即時通知;
    mise->>backend:料理完成;
    Note right of backend:status:cooked
    client-->>User:QRコードを表示
    User->>kiosk:QRコードを読み取り
    kiosk->>backend:ステータス書き換え
    backend-->>kiosk: &nbsp;
    Note right of backend:status:complete
    backend->>mise:注文完了
    mise->>mise:完了済みの注文を削除
    kiosk-->>User:食券発行
```
