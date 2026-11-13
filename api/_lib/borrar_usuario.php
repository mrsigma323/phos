<?php
// Borra una cuenta y todos sus datos (derecho de supresión). Lo usan la web y la app.
function borrar_usuario(PDO $pdo, array $u): void {
    $pdo->prepare('DELETE FROM sessions WHERE user_id = ?')->execute([$u['id']]);
    $pdo->prepare('DELETE FROM login_tokens WHERE email = ?')->execute([$u['email']]);
    // Los donativos quedan registrados en Stripe a efectos fiscales; aquí se desvinculan de la persona
    $pdo->prepare('UPDATE donations SET user_id = NULL WHERE user_id = ?')->execute([$u['id']]);
    // Comunidad: se borran sus mensajes, sus reacciones y sus denuncias
    $ids = $pdo->prepare('SELECT id FROM posts WHERE user_id = ?'); $ids->execute([$u['id']]);
    foreach ($ids->fetchAll(PDO::FETCH_COLUMN) as $pid) {
        $pdo->prepare('DELETE FROM reactions WHERE target = ?')->execute(['post:' . $pid]);
        $pdo->prepare('DELETE FROM reports WHERE post_id = ?')->execute([$pid]);
    }
    $pdo->prepare('DELETE FROM posts WHERE user_id = ?')->execute([$u['id']]);
    $pdo->prepare('DELETE FROM reactions WHERE who = ?')->execute([h('u:' . $u['id'])]);
    $pdo->prepare('DELETE FROM reports WHERE who = ?')->execute([h('u:' . $u['id'])]);
    $pdo->prepare('DELETE FROM news_log WHERE user_id = ?')->execute([$u['id']]);
    // Datos sincronizados desde la app (subrayados, notas, progreso, diario)
    try { $pdo->prepare('DELETE FROM app_sync WHERE user_id = ?')->execute([$u['id']]); } catch (PDOException $e) {}
    $pdo->prepare('DELETE FROM users WHERE id = ?')->execute([$u['id']]);
}
