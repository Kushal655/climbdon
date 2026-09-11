# Setup guide

You have two ZIP files. Each becomes its own GitHub repository:

| ZIP | Files | What it is |
|---|---|---|
| `climb-public.zip` | `index.html`, `config.js`, `translations.js`, `README.md`, `SETUP.md` | The public donation site, in 10 languages |
| `climb-admin.zip` | `index.html`, `admin-config.js`, `firestore.rules`, `SETUP.md` | Your admin panel and database rules |

The database is **Firebase Cloud Firestore** (by Google). The free Spark plan is enough for this site, and changes you make in the admin panel appear on the public site instantly.

Setup takes about 30 minutes, and you only do it once.

---

## 1. Create a Firebase project

1. Go to https://console.firebase.google.com and sign in with a Google account.
2. Click **Create a project**, name it (for example `climb-fund`), and finish the steps. You can turn Google Analytics off.

## 2. Copy your Firebase keys into both config files

1. On the project home page, click the **Web** icon (`</>`) to add a web app. Any nickname works. You don't need Firebase Hosting.
2. Firebase shows a `firebaseConfig` block. Copy its values (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`).
3. Paste them into **both** files:
   - `config.js` in the public folder
   - `admin-config.js` in the admin folder
4. In `config.js`, also set `yourName`, `contactEmail`, and `defaultLanguage`.

These keys are safe in a public repository. The rules in step 5 are what protect your data. GitHub may email you a "secret detected" alert about the API key; for Firebase web keys you can close that alert.

## 3. Create the database

1. Open **Build > Firestore Database** and click **Create database**.
2. If asked for an edition, choose **Standard**.
3. Pick a location near your visitors, such as `asia-south1` (Mumbai). This can't be changed later.
4. Choose **Start in production mode**.

## 4. Create your admin login

1. Open **Build > Authentication** and click **Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. On the **Users** tab, click **Add user** and enter your email and a strong password.
4. Copy the long **User UID** shown next to your email.

## 5. Lock the database to you

1. Open `firestore.rules` and replace `PASTE_YOUR_ADMIN_USER_ID` with your User UID.
2. In Firebase, go to **Firestore Database > Rules**, delete what's there, paste the whole file, and click **Publish**.

Now visitors can read your QR codes and supporters list and send "I've paid" notices. Only your account can change anything or read the notices.

## 6. Put the public site on GitHub Pages

1. Create a free account at https://github.com if you don't have one.
2. Click **New repository**. Name it `climb`, set it to **Public**, and create it.
3. Unzip `climb-public.zip` on your computer.
4. In the new repository, click **uploading an existing file** (or **Add file > Upload files**). Drag in the files themselves, not the ZIP or a folder, and click **Commit changes**.
5. Go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick **main** and **/(root)**, and click **Save**.
6. After a minute or two, your site is live at `https://YOUR-USERNAME.github.io/climb/`.

## 7. Put the admin panel on GitHub Pages

1. Create a second repository named `climb-admin`. It also needs to be **Public**, because free GitHub accounts can only publish Pages from public repositories.
2. Unzip `climb-admin.zip`. In `admin-config.js`, set `publicSiteUrl` to your site address from step 6.
3. Upload the files to `climb-admin` and turn on Pages the same way as in step 6.
4. Your admin panel is at `https://YOUR-USERNAME.github.io/climb-admin/`.

Anyone could find this page, and that's fine: they can't sign in without your password, and the database rules block every change that isn't from your account. The page also tells search engines not to list it.

## 8. Allow GitHub to sign you in

1. In Firebase, go to **Authentication > Settings > Authorized domains**.
2. Click **Add domain** and enter `YOUR-USERNAME.github.io` (no `https://`, no `/climb`).

Without this, signing in to the admin panel shows an "address isn't allowed" error.

## 9. Start using it

Open your admin panel and sign in.

- **QR codes**: Upload your eSewa and Khalti QR images, add the account name and ID, tick **Show on the site**, and save. When a wallet reaches its limit, upload a QR from another account. Untick **Show on the site** to hide a wallet.
- **Payment notices**: Each notice has a 5-digit **reference number** that the donor was asked to write in the payment remarks. Find that reference in your wallet history. If the money arrived, tap **Add as donation**.
- **Anonymous donors**: Notices from people who ticked **Donate anonymously** are marked. When you add them, keep **Show as Anonymous on the site** ticked. Their name is never saved to the public list.
- **Add donation**: Add any donation by hand with the name, amount, and date.
- **Donations**: Edit or delete entries on the supporters list.
- **Peaks**: Tick each mountain as you summit it.

---

## Updating the site later

- **Change text**: Edit `translations.js` in the `climb` repository. Each language has a `headline` and an `intro`. `{name}` is replaced with `yourName` from `config.js`. On GitHub, open the file, click the pencil icon, edit, and click **Commit changes**. The site updates in a minute or two.
- **Change the default language**: Set `defaultLanguage` in `config.js`. Visitors can always switch using the menu in the top corner. The page also remembers each visitor's choice, and you can share a link in a specific language by adding `?lang=ne` (or `hi`, `zh`, `ja`, `ko`, `es`, `fr`, `de`, `it`) to the address.
- **Minimum donation**: `minAmount` in `config.js` and `amount >= 10` in `firestore.rules` must match. If you change one, change the other and publish the rules again.
- **Cost figures**: The costs section uses approximate USD figures from 2025–2026. Permit fees change, and Nepali citizens pay less in Nepal, so update the numbers to match your own situation.

## Good to know

- Nobody appears on the supporters list automatically. Only donations you add do.
- The translations were written carefully, but it's worth having a native speaker check each language, especially the ones you'll share most.
- Forgot your password? Reset it in **Firebase > Authentication > Users**.
